var expect = require("chai").expect;
var interpreter = require("../components/midi-interpreter")();

describe("Midi signal interpretation", function(){

  describe("Note recognition", function(){

    it("should convert 0-11 number to a musical note array", function(){

      expect(interpreter.getNote(0)).to.eql(['C', 'B#']);
      expect(interpreter.getNote(11)).to.eql(["B", "Cb"]);

    });

  });

  describe("Chord recognition", function(){

    it("should convert an array of numbers into a chord", function(){

      expect(interpreter.getChord([0, 4, 7])).to.equal("C Major");
      expect(interpreter.getChord([0, 3, 7, 10])).to.equal("C Minor 7th (with 5th)");
      expect(interpreter.getChord([0])).to.equal("");

    });

  });

  describe("Full signal interpretation", function(){

    it("should take midi signal and return fully interpreted data", function(){

      interpreter.keyBuffer = [];

      expect(interpreter.interpretMidiInput({
        deltaTime: null,
        message: [144, 0, 1],
      })).to.deep.equal({
        chord: '',
        keyArray: [0],
        noteArray: [["C", "B#"]]
      });

    });

  });

});