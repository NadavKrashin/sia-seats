const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const path = __dirname + "/views/";
app.use(express.static(path));

let users = [];

io.on("connection", (socket) => {
  socket.on("user_join", (username, callback) => {
    users.push({ username, socketId: socket.id });
    socket.broadcast.emit(
      "user_join",
      users.map(({ username }) => username)
    );
    callback(users.map(({ username }) => username));
  });

  socket.on("choose-seat", ({ seatId, username }) => {
    socket.broadcast.emit("seat-chosen", { seatId, username });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "user_left",
      users.find(({ socketId }) => socketId === socket.id)?.username
    );
    users = users.filter(({ socketId }) => socketId !== socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

server.listen(8080, () => {
  console.log("listening on 3000");
});
