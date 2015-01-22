var tty = Npm.require('tty.js'),
    fs = Npm.require('fs'),
    crypto = Npm.require('crypto');


function sha1(text) {
  return crypto
    .createHash('sha1')
    .update(text)
    .digest('hex');
};

NucleusTerminal = {
  config: {
    username: '',
    password: '',
    port: 3333,
    hostname: 'localhost',
    shell: 'bash',
    cwd: '.'
  },

  configure: function(options) {
    options = options || {};
    this.config.username = options.username;
    this.config.password = options.password;

    this.config.port = options.port || this.config.port;
    this.config.hostname = options.hostname || this.config.hostname;
    this.config.shell = options.hostname || this.config.shell;
    this.config.cwd = options.hostname || this.config.cwd;
  },

  initialize: function(options) {
    this.configure(options);

    if (! this.config.username || !this.config.password) {
      throw new Meteor.error("Please provide username and password for terminal emulator. User NucleusTerminal.configure({username: '', password: ''})");
    }

    this.startTerminal();
  },

  startTerminal: function() {
    var user = sha1(NucleusTerminal.config.username),
        password = sha1(NucleusTerminal.config.password);

    var app = tty.createServer({
      "users": {
        user : password
      },
      "port": NucleusTerminal.config.port,
      "hostname": NucleusTerminal.config.hostname,
      "shell": NucleusTerminal.config.shell,
      "limitGlobal": 10000,
      "limitPerUser": 1000,
      "localOnly": false,
      "cwd": NucleusTerminal.config.cwd,
      "syncSession": false,
      "sessionTimeout": 600000,
      "log": false,
      "io": { "log": false },
      "debug": false,
      "term": {
        "termName": "xterm",
        "geometry": [100, 100],
        "scrollback": 1000,
        "visualBell": false,
        "popOnBell": false,
        "cursorBlink": false,
        "screenKeys": false
      }
    });

    app.get('/user.js', function(req, res, next) {
      res.set('Content-type', 'text/javascript');

      /**
       * XXX: Possible code smell
       * we could fs.readFileSync the user.js file in present dir and send it's code,
       * but reading that file while we're running the server from within meteor is
       * bit fragile. Since the code to send is little, I decided to just send it as a string.
       * If you want to change the code sent below, change in user.js file and copy here.
       */
      res.send(
        " \
        tty.on('connect', function() { \
        var w = new tty.Window(); \
        setTimeout(function() { \
        w.maximize(); \
        document.getElementsByClassName('bar')[0].remove(); \
        var win = document.getElementsByClassName('window')[0]; \
        win.style.top = '0px'; \
        win.style.paddingTop = '0px'; \
      }, 1); \
      }); \
        ");
    });

    app.get('/user.css', function(req, res, next) {
      res.set('Content-type', 'text/css');
      res.send('');
    });

    app.listen();
  }
};
