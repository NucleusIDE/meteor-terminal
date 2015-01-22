# What
It is a terminal emulator based on tty.js. i.e it provides a terminal emulator in your meteor app. It basically runs a tty.js express app with terminal full screened, and provide a template `nucleus_terminal` which you can then add to your app to create a terminal window there. `nucleus_terminal` is simply an iframe to the tty.js app running on another port on the same server. Port is configurable. See **Use** section below.

# Install
```sh
meteor add nucleuside:terminal
```

# Use
You need to initialize the NucleusTerminal with some configuration to use it. Here's an example with all the possible options you can provide with their default values

```js
NucleusTerminal.initialize({
  username: '',  //required
  password: '',  //required
  port: 3333,
  hostname: 'localhost',
  shell: 'bash',
  cwd: '.'
});
```

You should call above function in server side code.

Once initialized, you can add `{{> nucleus_terminal}}` template to your template. It will add an iframe to the tty.js app running on whatever port you give while initializing (or 3333 by default). It will resize according to outer div that contains it.

Username and password fields are required for security.
