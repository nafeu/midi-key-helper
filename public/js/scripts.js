socket = io({
  'reconnection': false
});

$(document).ready(function(){

  var main = $("#main");
  var contentNote = $("#content-note");
  var contentChord = $("#content-chord");

  socket.on("update", function(data){
    contentNote.text(data.note);
    contentChord.text(data.chord);
  });

});