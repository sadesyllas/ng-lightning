const shell = require('shelljs');
const request = require('request');
const inquirer = require('inquirer');
const q = require('q');

const GITHUB_REPOSITORY = 'ng-lightning/ng-lightning';

function requestConfig() {
  var deferred = q.defer();

  inquirer.prompt({
    type: 'list',
    name: 'type',
    message: 'What kind of patch you want to apply?',
    choices: [ 'Pull Request', 'Commit'],
  }, function(response) {
    if (response.type === 'Pull Request') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'prno',
          message: 'Which PR number would you like to merge?'
        },
        {
          type: 'confirm',
          name: 'append',
          message: `Append "Closes #PR" to commit message?`
        },
      ], function (answers) {
        answers.patchUrl = `http://patch-diff.githubusercontent.com/raw/${GITHUB_REPOSITORY}/pull/${answers.prno}.patch`;
        deferred.resolve(answers);
      });
    } else if (response.type === 'Commit') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'hash',
          message: 'Which commit hash would you like to merge?'
        },
      ], function (response) {
        deferred.resolve({
          append: false,
          patchUrl: `http://github.com/${GITHUB_REPOSITORY}/commit/${response.hash}.patch`,
          prno: response.hash.substring(0, 7),
        });
      });
    }
  });
  return deferred.promise;
}

function createBranch(config) {
  var deferred = q.defer();
  shell.exec(`git checkout master && git checkout -b pr${config.prno}`, code => {
    if (code !== 0) return deferred.reject();
    deferred.resolve(config);
  });
  return deferred.promise;
}

function applyPatch(config) {
  var deferred = q.defer();
  console.log('Requesting patch content...');
  request(config.patchUrl, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.log('Error while getting patch:', err);
      return deferred.reject(err);
    }

    const patchFile = `${shell.tempdir()}/gh-${config.prno}-${+new Date()}`;
    body.to(patchFile);
    console.log(`Wrote to file: ${patchFile}`);

    shell.exec(`git am -3 ${patchFile}`, (code) => {
      if (code !== 0) {
        console.log(`Couldn't apply patch from file: ${patchFile}`);
        return deferred.reject();
      };
      console.log(`Patch applied!`);
      shell.rm(patchFile);
      deferred.resolve(config);
    });
  });
  return deferred.promise;
}

function editCommitMessage(config) {
  if (!config.append) return q.when(config);

  var deferred = q.defer();
  shell.exec(`git show --format=%B HEAD -s`, (code, out) => {
    if (code !== 0) return deferred.reject();

    const commitmsg = `${out}\n\nCloses #${config.prno}`;
    const patchFile = `${shell.tempdir()}/gh-${config.prno}-msg-${+new Date()}`;
    commitmsg.to(patchFile);
    shell.exec(`git commit --amend -F ${patchFile}`, () => {
      shell.rm(patchFile);
      deferred.resolve(config);
    });
  });
  return deferred.promise;
}


// Start
requestConfig()
  .then(createBranch)
  .then(applyPatch)
  .then(editCommitMessage);
