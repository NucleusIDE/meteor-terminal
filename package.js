Package.describe({
  name: 'nucleuside:terminal',
  version: '0.1.0',
  summary: 'tty.js based terminal emulator for Meteor',
  git: 'https://github.com/nucleuside/meteor-terminal',
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


  api.addFiles([
    'terminal.js',
    'tty-express-app/server.js'
  ], ['server']);

  api.export('NucleusTerminal', ['server']);
});
