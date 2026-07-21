import Room from "../Models/Room.js";

function removeUser(socket, io) {
  const { roomId, username } = socket;

  if (!roomId || !onlineUsers.has(roomId)) return;

  const users = onlineUsers.get(roomId);

  users.delete(username);

  if (users.size === 0) {
    onlineUsers.delete(roomId);
  } else {
    io.to(roomId).emit("onlineUsers", {
      nowOnline: [...users],
    });
  }
}

export const registerSocket = (io, onlineUsers) => {
  io.on("connection", async (socket) => {
    console.log(`A user connected with ${socket.id}`);

    socket.on("joinRoom", async ({ roomId, username }, callback, req) => {
      const room = await Room.findOne({ roomId }).populate("file");
      if (!room) {
        return callback({
          failure: true,
          message: "roomId is invalid",
        });
      }

      socket.username = username;

      socket.join(roomId);
      socket.roomId = roomId;
      return callback({
        success: true,
        message: `Joined room ${roomId}`,
        fileName: room.file.fileName,
      });
    });

    socket.on("leaveRoom", (callback) => {
      socket.leave(socket.roomId);
      onlineUsers.get(socket.roomId).delete(socket.username);
      let nowOnline = [];
      if (onlineUsers.get(socket.roomId).size == 0) {
        onlineUsers.delete(socket.roomId);
      } else {
        nowOnline = [...onlineUsers.get(socket.roomId)];
      }

      io.to(socket.roomId).emit("onlineUsers", { nowOnline });
      return callback({
        success: true,
        message: `Left room ${socket.roomId}`,
      });
    });

    socket.on("codeChange", ({ roomId, code }) => {
      socket.to(roomId).emit("codeChange", code);
    });

    socket.on("onlineUsers", ({ currentUsername }, callback) => {
      socket.username = currentUsername;

      console.log(socket.username);

      if (!onlineUsers.has(socket.roomId)) {
        onlineUsers.set(socket.roomId, new Set());
      }

      onlineUsers.get(socket.roomId).add(socket.username);

      const nowOnline = [...onlineUsers.get(socket.roomId)];

      io.to(socket.roomId).emit("onlineUsers", { nowOnline });
    });
  });
};
