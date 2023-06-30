const path = require("path");
const htpp = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utills/message");
const publicpath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = htpp.createServer(app);
let io = socketIO(server);

app.use(express.static(publicpath));

io.on("connection", (socket) => {
  console.log("new user is just connected");

  socket.emit("newMessage", generateMessage("Admin", '"Welcome to the chat!'));

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined!")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback('This is Sever');
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.lat, coords.lng)
    );
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
