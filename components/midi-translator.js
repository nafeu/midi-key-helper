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

  getNote: function(midiNote) {
    return this.notes[midiNote];
  }

};