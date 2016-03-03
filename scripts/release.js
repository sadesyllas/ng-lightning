const path = require('path');
const q = require('q');
const inquirer = require('inquirer');
const replace = require('replace');
const semver = require('semver');
const root = require('app-root-path').path;
const git = require('simple-git')( root );
const conventionalChangelog = require('conventional-changelog');
const fs = require('fs');
const child_process = require('child_process');

const packageFile = `${root}/package.json`;
const changelogFile = `${root}/CHANGELOG.md`;

function requestReleaseType() {
  var deferred = q.defer();
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What type of release would you like?',
      choices: ['patch', 'minor', 'major'],
      default: 0
    }
  ], function( answers ) {
      deferred.resolve( answers.type );
  });
  return deferred.promise;
}

function bump( current, type) {
  const next = semver.inc( current, type );

  replace({
    regex: /"version": "[^"]+"/m,
    replacement: `"version": "${next}"`,
    paths: [ packageFile ],
    recursive: false,
  });

  return q.when( next );
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
  const wstream = fs.createWriteStream(changelogFile);

  conventionalChangelog({
    preset: 'angular',
    releaseCount: 0,
  })
  .pipe(wstream);

  return q.when( version );
}

// Start
requestReleaseType()
.then(type => bump(require(packageFile).version, type))
.then(changelog)
.then(preVersion)
.then(runVersion, () => q.reject())
.then(publish, () => q.reject())
.then(postVersion)
.then(push);
