const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app); // Initialize the server here
const io = socketIO(server); // Use the server object

const publicPath = path.join(__dirname, 'public'); // Define the path to the "public" folder
app.use(express.static(publicPath))
let socketsConnected = new Set();

io.on('connection', onConnected);

function onConnected(socket){
  console.log(socket.id)
  socketsConnected.add(socket.id)
  io.emit('clients-total',socketsConnected.size)

  socket.on('disconnect', ()=>{
    console.log('socket disconnected',socket.id)
    socketsConnected.delete(socket.id)
    io.emit('clients-total',socketsConnected.size)
  })
  socket.on('message',(data)=>{
    console.log(data);
    socket.broadcast.emit('chat-message',data);
  })
}

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
