(function() {
	var socket = io.connect();
  socket.on('this', function (data) {
    console.log(data);
    
  });

})()