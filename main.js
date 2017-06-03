const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const midi = require('midi')
const interpreter = require('./components/midi-interpreter')()

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

let win

function createWindow () {

  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

}

// ---------------------------------------------------------------------------
// Application Lifecycle
// ---------------------------------------------------------------------------

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
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
var input = new midi.input()

// Count the available input ports.
if (input.getPortCount()) {

  // Get the name of a specified input port.
  input.getPortName(0)

  // Open the first available input port.
  console.log("[ main.js ] Opening first available midi port...")
  input.openPort(0);

  // Meta: (Sysex, Timing, Active Sensing)
  input.ignoreTypes(false, false, false)
  // input.ignoreTypes(true, false, true)

  process.on("SIGTERM", function(){
    console.log("[ main.js ] Closing port...")
    input.closePort();
  });

} else {
  console.log("No MIDI port opened, please connect a device and restart application...")
}

input.on('message', function(deltaTime, message) {

  // console.log('m:' + message + ' d:' + deltaTime);
  win.webContents.send("update", interpreter.interpretMidiInput({
    deltaTime: deltaTime,
    message: message
  }));

});