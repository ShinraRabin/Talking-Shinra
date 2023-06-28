const path = require("path");
const htpp = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicpath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = htpp.createServer(app);
let io = socketIO(server);



app.use(express.static(publicpath));

io.on('connection', (socket) =>{
  console.log("new user is just connected")

  socket.on('createMessage', (message) => {
    console.log("createMessage", message);
  })

  socket.on('disconnect', () =>{
    console.log("User was disconnected");
  });

});




server.listen(3000, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
