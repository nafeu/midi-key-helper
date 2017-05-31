var midi = require('midi');

// Set up a new input.
var input = new midi.input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {
  console.log('m:' + message + ' d:' + deltaTime);
  console.log('NOTE: ', parseInt(message[1]) % 12)
});

// Open the first available input port.
console.log("[ server.js ] Opening first available midi port...");
input.openPort(0);

// Sysex, timing, and active sensing messages are ignored
// by default. To enable these message types, pass false for
// the appropriate type in the function below.
// Order: (Sysex, Timing, Active Sensing)
// For example if you want to receive only MIDI Clock beats
// you should use
// input.ignoreTypes(true, false, true)
input.ignoreTypes(false, false, false);

// // ... receive MIDI messages ...

process.on("SIGTERM", function(){
  console.log("[ server.js ] Closing port...");
  input.closePort();
});
