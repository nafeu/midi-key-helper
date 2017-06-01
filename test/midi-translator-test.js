var expect = require("chai").expect;
var midiTranslator = require("../components/midi-translator");


describe("Midi signal translation", function(){

  describe("Note recognition", function(){

    it("should convert 0-11 number to a musical note array", function(){

      expect(midiTranslator.getNote(0)).to.eql(['C', 'B#']);
      expect(midiTranslator.getNote(11)).to.eql(["B", "Cb"]);

    });

  });

  describe("Chord recognition", function(){

    it("should convert an array of numbers into a chord", function(){

      expect(midiTranslator.getChord([0, 4, 7])).to.equal("C Major");
      expect(midiTranslator.getChord([0, 3, 7, 10])).to.equal("C Minor 7th (with 5th)");
      expect(midiTranslator.getChord([0])).to.equal("");

    });

  });

});