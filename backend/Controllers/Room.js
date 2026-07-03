import User from "../Models/User.js";
import Room from "../Models/Room.js";
import File from "../Models/File.js";
import { nanoid } from "nanoid";

export const getLobby = async (req, res, next) => {
  res.json({
    success: true,
    message: "User is authenticated",
  });
};

export const postRoomFile = async (req, res, next) => {
  const { roomName, fileName, language } = req.body;
  const roomId = nanoid(8);
  // 1. Create the room
  const room = await Room.create({
    roomId,
    roomName,
    owner: req.user,
  });

  // 2. Create the file and link it to the room
  const file = await File.create({
    room,
    fileName,
    language,
    content: "",
  });

  // 3. Save the file's ObjectId in the room
  room.file = file;

  await room.save();

  res.json({
    success: true,
    message: "Room and File added successfully",
    roomId,
  });
};

export const getRoom = async (req, res, next) => {
  const { roomId } = req.params;

  const room = await Room.findOne({ roomId })
    .populate("file")
    .populate("owner");

  if (!room) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
  }

  res.json({
    success: true,
    Room: {
      roomId: room.roomId,
      roomName: room.roomName,
      roomOwner: room.owner.username,
      fileName: room.file.fileName,
      language: room.file.language,
    },
  });
};
