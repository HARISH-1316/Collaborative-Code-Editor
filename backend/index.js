import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const port = process.env.PORT || 3000;

import session from "express-session";

const sessionOptions = {
  secret: "mySecretCode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const ROOMS = [];

io.on("connection", async (socket) => {
  console.log(`A user connected with ${socket.id}`);

  socket.on("roomState", (roomId) => {
    const Room = ROOMS.find((room) => room.roomId == roomId);

    socket.emit("roomState", Room);
  });

  socket.on("createRoom", ({ roomName, userName }) => {
    const roomId = ROOMS.length.toString();
    const Room = {
      roomId,
      roomName: roomName,
      roomOwner: userName,
    };

    socket.join(roomId);

    ROOMS.push(Room);

    socket.emit("joinRoom", roomId);
  });

  socket.on("joinRoom", ({ roomId, userName }) => {
    const Room = ROOMS.find((room) => room.roomId == roomId);
    if (!Room) {
      //do something
    }

    socket.join(roomId);

    socket.roomId = roomId;
    socket.userName = userName;

    socket.emit("joinRoom", roomId);
  });

  socket.on("leaveRoom", () => {
    socket.leave(socket.roomId);
    socket.emit("leaveRoom");
  });

  socket.on("codeChange", ({ roomId, code }) => {
    console.log(roomId);
    console.log(code);
    socket.to(roomId).emit("codeChange", code);
  });

  // socket.on("disconnect", () => {
  //   const Room = ROOMS.find((Room) => Room.roomId == socket.roomId);
  //   Room.onlineUsers = Room.onlineUsers.filter(
  //     (user) => user != socket.userName,
  //   );
  //   io.to(socket.roomId).emit("userLeft", { onlineUsers: Room.onlineUsers });
  // });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(port, () => {
  console.log(`Server is listening to ${port}`);
});
