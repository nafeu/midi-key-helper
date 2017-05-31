var expect = require("chai").expect;
var mt = require("../components/midi-translator");


describe("Midi signal translation", function(){

  describe("Note recognition", function(){

    it("should convert 0-11 number to a musical note", function(){

      expect(mt.getNote(0)).to.equal("C, B#");
      expect(mt.getNote(11)).to.equal("B, Cb");

    });

  });

  describe("Chord recognition", function(){

    it("should convert an array of numbers into a chord", function(){

      expect(mt.getChord([0, 4, 7])).to.equal("C");
      expect(mt.getChord([0])).to.equal("");

    });

  });

});