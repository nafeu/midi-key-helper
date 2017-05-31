module.exports = {

  notes: [
    "C, B#",
    "Db, C#",
    "D",
    "Eb, D#",
    "E, Fb",
    "F, E#",
    "Gb, F#",
    "G",
    "Ab, G#",
    "A",
    "Bb, A#",
    "B, Cb"
  ],

  chords: {
    "047": "C"
  },

  getChord: function(midiNoteArray) {
    var chord = this.chords[midiNoteArray.sort().join('')];
    if (chord) return chord;
    return "";
  },

  getNote: function(midiNote) {
    return this.notes[midiNote];
  }

};