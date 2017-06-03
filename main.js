const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const midi = require('midi')
const interpreter = require('./components/midi-interpreter')()

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// ---------------------------------------------------------------------------
// Application Logic
// ---------------------------------------------------------------------------

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
if (input.getPortCount()) {

  // Get the name of a specified input port.
  input.getPortName(0);

  // Open the first available input port.
  console.log("[ main.js ] Opening first available midi port...");
  input.openPort(0);

  // Meta: (Sysex, Timing, Active Sensing)
  input.ignoreTypes(false, false, false);
  // input.ignoreTypes(true, false, true)

  process.on("SIGTERM", function(){
    console.log("[ main.js ] Closing port...");
    input.closePort();
  });

} else {
  console.log("No MIDI port opened, please connect a device and restart application...");
}

input.on('message', function(deltaTime, message) {

  // console.log('m:' + message + ' d:' + deltaTime);
  win.webContents.send("update", interpreter.interpretMidiInput({
    deltaTime: deltaTime,
    message: message
  }));

});