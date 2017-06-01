socket = io({
  'reconnection': false
});

$(document).ready(function(){

  var main = $("#main");
  var contentNote = $("#content-note");
  var contentChord = $("#content-chord");

  socket.on("update", function(data){
    contentNote.empty();
    data.note.forEach(function(item){
      contentNote.append(createNoteElement(item));
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