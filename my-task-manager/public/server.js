const users = [
  { username: "Nitin" },
  { username: "Aniket" },
  // Add more user objects as needed
];

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
//const io = socketIo(server);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join("C:/Users/Nitin/Desktop/music")));

app.get("/", (req, res) => {
  res.sendFile(
    path.join("C:/Users/Nitin/Desktop/music/my-task-", "index.html")
  );
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming chat messages
  socket.on("chat message", (data) => {
    io.emit("chat message", data); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
