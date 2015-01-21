var tty = Npm.require('tty.js'),
    fs = Npm.require('fs');


var app = tty.createServer({
  "users": {
    "hello": "world"
  },
  "port": 3333,
  "hostname": 'localhost',
  "shell": "bash",
  "limitGlobal": 10000,
  "limitPerUser": 1000,
  "localOnly": false,
  "cwd": ".",
  "syncSession": false,
  "sessionTimeout": 600000,
  "log": true,
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
