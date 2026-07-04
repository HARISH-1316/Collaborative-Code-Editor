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
    fileId: room.file,
  });
};

export const getRoom = async (req, res, next) => {
  const { roomId, fileId } = req.params;
  console.log(fileId);

  const room = await Room.findOne({ roomId }).populate("owner");

  const file = await File.findById(fileId);

  if (!room || !file) {
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
      fileName: file.fileName,
      content: file.content,
      language: file.language,
    },
  });
};

export const postCode = async (req, res, next) => {
  const { fileId } = req.params;
  const { code } = req.body;
  const file = await File.findByIdAndUpdate(
    fileId,
    {
      content: code,
    },
    {
      new: true,
    },
  );

  res.json({
    success: true,
    message: "Code Saved successfully",
  });
};
