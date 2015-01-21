Package.describe({
  name: 'channikhabra:tty',
  version: '0.0.1',
  summary: 'tty.js for Meteor',
  git: 'https://github.com/channikhabra/meteor-tty',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.addFiles('channikhabra:tty.js');
});
