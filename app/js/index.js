var $ = require("jquery");
var ipcRenderer = require('electron').ipcRenderer

$(document).ready(function(){

  var main = $("#main");
  var contentNote = $("#content-note");
  var contentChord = $("#content-chord");
  var colors = {
    "red" : "#e74c3c"
  };

  ipcRenderer.on("update", function(event, data){
    contentNote.empty();
    data.noteArray.forEach(function(note){
      contentNote.append(createNoteElement(note));
    });
    $(".key-black").css("background-color", "black");
    $(".key-white").css("background-color", "white");
    data.keyArray.forEach(function(key){
      $(".key-"+key).css("background-color", colors.red);
    });
    contentChord.text(data.chord);
  });

});

function createNoteElement(noteArray) {
  var out = $("<div>", { class: "note-block" }),
      noteMain = $("<div>", { class: "note-main" }),
      noteAlt = $("<div>", { class: "note-alt" });

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