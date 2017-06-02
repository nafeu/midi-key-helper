var midi           = require('midi')
  , _              = require('lodash')
  , midiTranslator = require('./components/midi-translator')
  , express        = require('express')
  , app            = express()
  , http           = require('http')
  , server         = require('http').Server(app)
  , bodyParser     = require('body-parser')
  , io             = require('socket.io')(server);

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// Server
server.listen(process.env.PORT || 8000, function(){
  console.log('[ server.js ] Listening on port ' + server.address().port);
});

// Socket.io configs
io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);

// Express server configs
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// ---------------------------------------------------------------------------
// Socket Event Listeners
// ---------------------------------------------------------------------------

io.on('connection', function(socket){

  console.log(socket.id + " connected...");

  socket.on('disconnect', function(){
    console.log(socket.id + " disconnected...");
  });

});

// ---------------------------------------------------------------------------
// Express API
// ---------------------------------------------------------------------------

app.get('/api/test', function(req, res){
  res.status(200).send('OK');
});

// ---------------------------------------------------------------------------
// Application Logic
// ---------------------------------------------------------------------------

// Set up a new input.
var input     = new midi.input()
  , keyBuffer = [];

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);

// Configure a callback.
input.on('message', function(deltaTime, message) {

  // console.log('m:' + message + ' d:' + deltaTime);
  var key = parseInt(message[1]) % 12;

  if (message[0] == 144) {
    if (!_.includes(keyBuffer, key)) {
      keyBuffer.push(key);
    }
  } else {
    keyBuffer = _.remove(keyBuffer, function(k) {
      return k != key;
    });
  }

  io.emit("update", {
    chord: midiTranslator.getChord(keyBuffer),
    keyArray: keyBuffer,
    noteArray: keyBuffer.map(function(key){ return midiTranslator.getNote(key); }),
  });

});

// Open the first available input port.
console.log("[ server.js ] Opening first available midi port...");
input.openPort(0);

// Meta: (Sysex, Timing, Active Sensing)
input.ignoreTypes(false, false, false);
// input.ignoreTypes(true, false, true)

process.on("SIGTERM", function(){
  console.log("[ server.js ] Closing port...");
  input.closePort();
});