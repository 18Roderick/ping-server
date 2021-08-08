(() => {
  const socket = io();

  socket.on("serverPing", (msg) => {
    console.log(msg);
  });
})();
