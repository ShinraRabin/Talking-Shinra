const path = require("path");
const htpp = require("http");
const express = require("express");
const authRoute = require("./routes/authRote")
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utills/message");
const publicpath = path.join(__dirname, "/../public");
const crypto = require("crypto");
const cors = require("cors");

const secretKey = crypto.randomBytes(16).toString("hex");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};



const db = require("../Public/js/index");
const { connected } = require("process");
db.sequelize.sync({ force: false });
const port = process.env.PORT || 3000;
let app = express();
let server = htpp.createServer(app);
let io = socketIO(server);

app.use(express.static(publicpath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/room", (req, res) => {
  res.sendFile(path.join(publicpath, 'room.html'));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(publicpath, 'login.html'));
});



io.on("connection", (socket) => {
  console.log("A client is Connected");

  // socket.emit("newMessage", generateMessage("Admin", '"Welcome to the chat!'));

  // socket.broadcast.emit(
  //   "newMessage",
  //   generateMessage("Admin", "New user joined!")
  // );
  
  // Store the connected client
  socket.on('storeClientInfo', (userData) => {
    const { username } = userData;
    connectedClients[username] = socket;
    console.log(`${username} connected`);
  });
  

  socket.on('message',(data) =>{
    const {sender, receiver,message} = data;

    connecttion.query('INSERT INTO messages (sender, receiver, message) VALUES (?, ?, ?)',
    [sender, receiver, message],
    (err) =>{if (err) throw err;

      const recepientSocket = connectedClients[receiver];
      if(recepientSocket) {
        recepientSocket.emit('message', data);
      }

    }
    );
  });

  // socket.on("createMessage", (message, callback) => {
  //   console.log("createMessage", message);
  //   io.emit("newMessage", generateMessage(message.from, message.text));
  //   callback('This is Sever');
  // });

  // socket.on("createLocationMessage", (coords) => {
  //   io.emit(
  //     "newLocationMessage",
  //     generateLocationMessage("Admin", coords.lat, coords.lng)
  //   );
  // });

  // socket.on("disconnect", () => {
  //   console.log("User was disconnected");
  // });
  socket.on('disconnect', () => {
    const disconnectedUser = Object.keys(connectedClients).find(
      (key) => connectedClients[key] === socket
    );

    if (disconnectedUser) {
      delete connectedClients[disconnectedUser];
      console.log(`${disconnectedUser} disconnected`);
    }
  });
});


app.use(cors(corsOptions)); 
app.use("/", authRoute);

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
