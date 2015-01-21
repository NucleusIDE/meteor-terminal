Package.describe({
  name: 'channikhabra:tty',
  version: '0.0.1',
  summary: 'tty.js for Meteor',
  git: 'https://github.com/channikhabra/meteor-tty',
  documentation: 'README.md'
});

Npm.depends({
  "tty.js": 'https://github.com/channikhabra/tty.js/archive/49951586f68e03d715cd1520adac2c2d54adca2a.tar.gz'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  api.use(['templating', 'underscore']);


  api.addFiles([
    'template.html',
    'template.js'
  ], ['client']);


  api.addFiles('tty-express-app/server.js', ['server']);

  api.export([]);
});
