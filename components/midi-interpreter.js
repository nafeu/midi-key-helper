var _ = require('lodash');

module.exports = function(){

  return {

    keyBuffer: [],

    notes: [
      ["C", "B#"],
      ["Db", "C#"],
      ["D"],
      ["Eb", "D#"],
      ["E", "Fb"],
      ["F", "E#"],
      ["Gb", "F#"],
      ["G"],
      ["Ab", "G#"],
      ["A"],
      ["Bb", "A#"],
      ["B", "Cb"]
    ],

    chords: {

      // C
      "047": "C Major",
      "04": "C Major (No 5th)",
      "0411": "C Major 7th",
      "04711": "C Major 7th (with 5th)",
      "07": "C Power Chord",
      "057": "C Suspended Chord",
      "027": "C Suspended 2nd",
      "0479": "C Sixth Chord",
      "049": "C Sixth Chord (No 5th)",
      "037": "C Minor",
      "039": "C Minor 6th",
      "0379": "C Minor 6th (with 5th)",
      "0310": "C Minor 7th",
      "03710": "C Minor 7th (with 5th)",
      "03610": "C Minor 7th Flat Five",
      "03810": "C Minor 7th Sharp Five",

    },

    getChord: function(midiNoteArray) {
      var chordHash = midiNoteArray.sort(function (a, b) {  return a - b;  }).join('');
      var chord = this.chords[chordHash];
      if (chord) return chord;
      return "";
    },

    getNote: function(midiNote) {
      return this.notes[midiNote % 12];
    },

    interpretMidiInput: function(data) {

      var key = parseInt(data.message[1]) % 12;
      var _this = this;

      if (data.message[0] == 144) {
        if (!_.includes(_this.keyBuffer, key)) {
          _this.keyBuffer.push(key);
        }
      } else {
        _this.keyBuffer = _.remove(_this.keyBuffer, function(k) {
          return k != key;
        });
      }

      return {
        chord: _this.getChord(_this.keyBuffer),
        keyArray: _this.keyBuffer,
        noteArray: _this.keyBuffer.map(function(key){ return _this.getNote(key); }),
      };

    }

  };

};