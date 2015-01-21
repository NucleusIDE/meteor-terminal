// tty is exposed on client by tty.js

/**
 * tty.js  call for a user.js and user.css files which are not included with the tty.js npm package.
 * We use this to send the code we need to the app. i.e the code to initialize a terminal, and maximize it
 */

tty.on('connect', function() {
  var w = new tty.Window();
  setTimeout(function() {
    w.maximize();
    // remove the top bar on the window which allow users to resize the terminal window.
    // Since we gonna show it in iframe, we don't want users to see this
    document.getElementsByClassName('grip')[0].remove();
    document.getElementsByClassName('bar')[0].remove();
    var win = document.getElementsByClassName('window')[0];
    win.style.top = '0px';
    win.style.paddingTop = '0px';
  }, 1);
});
