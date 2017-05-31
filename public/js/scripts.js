socket = io({
  'reconnection': false
});

$(document).ready(function(){

  var body = $("body");

  socket.on("message", function(data){
    body.append(data.message);
  });

});