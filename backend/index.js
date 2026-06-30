import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const port = process.env.PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const ROOMS = [];

io.on("connection", async (socket) => {
  console.log(`A user connected with ${socket.id}`);

  socket.on("roomState", (roomId) => {
    const Room = ROOMS.find((Room) => Room.roomId == roomId);

    socket.emit("roomState", Room);
  });

  socket.on("createRoom", ({ roomName, userName }) => {
    const roomId = ROOMS.length.toString();
    const Room = {
      roomId: ROOMS.length.toString(),
      roomName: roomName,
      roomOwner: userName,
    };

    socket.join(roomId);

    ROOMS.push(Room);

    socket.emit("joinRoom", roomId);
  });

  socket.on("joinRoom", ({ roomId, userName }) => {
    const Room = ROOMS.find((Room) => Room.roomId === roomId);
    if (!Room) {
      //do something
    }
    socket.join(roomId);

    socket.emit("joinRoom", roomId);
  });

  socket.on("codeChange", ({ roomId, code }) => {
    console.log(roomId);
    console.log(code);
    socket.to(roomId).emit("codeChange", code);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
