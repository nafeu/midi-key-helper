socket = io({
  'reconnection': false
});

$(document).ready(function(){

  var body = $("body");

  socket.on("message", function(data){
    console.log("[ socket ] Message : ", data);
    body.html(data.message);
  });

});