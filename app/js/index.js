const $ = require("jquery")
const {ipcRenderer} = require('electron')
const Tone = require('tone')

function createNoteElement(noteArray) {
  const out = $("<div>", {class: "note-block"})
  const noteMain = $("<div>", {class: "note-main"})
  const noteAlt = $("<div>", {class: "note-alt"})

  noteMain.text(noteArray[0]);
  out.append(noteMain);

  if (noteArray.length > 1) {
    noteAlt.text(noteArray[1]);
  } else {
    noteAlt.text("...");
  }

  out.append(noteAlt);

  return out;
}

$(document).ready(function(){
  const contentNote = $("#content-note")
  const contentChord = $("#content-chord")
  const colors = {"red": "#e74c3c"}
  const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

  ipcRenderer.on("update", function(event, data){
    contentNote.empty();

    data.noteArray.forEach(function(note){
      contentNote.append(createNoteElement(note))
    });

    $(".key-black").css("background-color", "black")
    $(".key-white").css("background-color", "white")

    let selection;

    data.keyArray.forEach(function(key){
      selection = `.key-${key}`
      $(selection).css("background-color", colors.red)
    });

    contentChord.text(data.chord);
  });

  ipcRenderer.on("keydown", function(event, data){
    synth.triggerAttack(data);
  });

  ipcRenderer.on("keyup", function(event, data){
    synth.triggerRelease(data);
  });


});