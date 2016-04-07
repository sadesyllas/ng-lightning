const path = require('path');
const q = require('q');
const inquirer = require('inquirer');
const replace = require('replace');
const semver = require('semver');
const root = require('app-root-path').path;
const git = require('simple-git')( root );
const child_process = require('child_process');

const packageFile = `${root}/package.json`;
const changelogFile = `${root}/CHANGELOG.md`;

function requestReleaseType(current) {
  var deferred = q.defer();
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What type of release would you like?',
      choices: ['patch', 'minor', 'major'].map(type => `${type} (${semver.inc( current, type )})`),
      default: 0
    }
  ], function( answers ) {
      deferred.resolve( answers.type.match(/\(.*\)/g)[0].slice(1, -1) );
  });
  return deferred.promise;
}

function bump( version ) {

  replace({
    regex: /"version": "[^"]+"/m,
    replacement: `"version": "${version}"`,
    paths: [ packageFile ],
    recursive: false,
  });

  return q.when( version );
}

function preVersion( version ) {
  var deferred = q.defer();
  inquirer.prompt([
    { type: 'confirm', name: 'continue', message: `Continue with release of ${version}? (Last chance to edit CHANGELOG!)`, default: true },
  ], function( answer ) {
    if (answer.continue) {
      deferred.resolve(version);
    } else {
      git.reset('hard', () => deferred.reject(new Error()));
    }
  });
  return deferred.promise;
}

function runVersion( version ) {
  if (!version) {
    console.log('No valid version!');
    process.exit(1);
  }

  var deferred = q.defer();

  console.log('Committing...');
  git.commit(`chore(release): ${version}`, [ packageFile, changelogFile ], () => {
    console.log('Tagging...');
    git.addAnnotatedTag(`v${version}`, 'Version release', () => deferred.resolve(version));
  });

  return deferred.promise;
}

function publish(version) {
  var deferred = q.defer();
  console.log('Publishing...');
  child_process.exec('gulp prepublish && npm publish ./dist', function (err, stdout, stderr){
    if (err) {
      console.log('child processes failed with error code: ', err);
      deferred.reject();
    } else {
      console.log(stdout);
      deferred.resolve(version);
    }
  });
  return deferred.promise;
}

function postVersion( version ) {
  var deferred = q.defer();
  bump( version, 'prerelease').then(() => {
    git.commit(`chore(release): starting new releace cycle`, [ packageFile ], deferred.resolve());
  });
  return deferred.promise;
}

function push() {
  var deferred = q.defer();
  inquirer.prompt({
    type: 'confirm',
    name: 'push',
    message: 'Push to origin?',
    default: true,
  }, function(response) {
    if (response.push) {
      git.push('origin', 'master', () => git.pushTags('origin', () => deferred.resolve(true)));
      return;
    }
    deferred.resolve(false);
  });
  return deferred.promise;
}

function changelog( version ) {
  const shell = require('shelljs');

  var deferred = q.defer();
  shell.exec(`${root}/node_modules/.bin/conventional-changelog -p angular -i ${changelogFile} -s`, (code) => {
    deferred.resolve(version);
  });
  return deferred.promise;
}

// Start
const currentVersion = require(packageFile).version;

requestReleaseType(currentVersion)
.then(bump)
.then(changelog)
.then(preVersion)
.then(runVersion, () => q.reject())
.then(publish, () => q.reject())
.then(postVersion)
.then(push);
