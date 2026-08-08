import User from "../Models/User.js";
import Room from "../Models/Room.js";
import File from "../Models/File.js";
import { nanoid } from "nanoid";
import ExpressError from "../utils/ExpressError.js";

export const postRoomFile = async (req, res) => {
  const { roomName, fileName, language } = req.body;

  const roomId = nanoid(8);

  const room = await Room.create({
    roomId,
    roomName,
    owner: req.user._id,
  });

  const file = await File.create({
    room,
    fileName,
    language,
    content: "",
  });

  room.file = file._id;
  await room.save();

  req.user.myRooms.unshift({
    room: room._id,
    createdAt: new Date(),
  });

  await req.user.save();

  res.json({
    success: true,
    message: "Room and File added successfully",
    roomId,
    fileName: file.fileName,
  });
};

export const getRoom = async (req, res) => {
  const { roomId, fileName } = req.params;
  console.log(roomId, fileName);

  const room = await Room.findOne({ roomId }).populate("owner");

  if (!room) {
    throw new ExpressError(404, "Room not found");
  }

  const file = await File.findOne({
    room: room._id,
    fileName,
  });

  if (!file) {
    throw new ExpressError(404, "File not found");
  }

  req.user.recentRooms = req.user.recentRooms.filter(
    (r) => r.room.toString() !== room._id.toString(),
  );

  req.user.recentRooms.unshift({
    room: room._id,
    joinedAt: new Date(),
  });

  await req.user.save();

  res.json({
    success: true,
    room: {
      roomId: room.roomId,
      roomName: room.roomName,
      roomOwner: room.owner.username,
      fileName: file.fileName,
      content: file.content,
      language: file.language,
    },
    user: {
      username: req.user.username,
    },
  });
};

export const postCode = async (req, res) => {
  const { roomId, fileName } = req.params;
  const { code } = req.body;

  const room = await Room.findOne({ roomId });

  if (!room) {
    throw new ExpressError(404, "Room not found");
  }

  const file = await File.findOneAndUpdate(
    {
      room: room._id,
      fileName,
    },
    {
      content: code,
    },
    {
      new: true,
    },
  );

  if (!file) {
    throw new ExpressError(404, "File not found");
  }

  res.json({
    success: true,
    message: "Code saved successfully",
  });
};

export const editRoom = async (req, res) => {
  const { roomId } = req.params;
  const { roomName, fileName, language } = req.body;

  const room = await Room.findOne({ roomId });

  if (!room) {
    throw new ExpressError(404, "Room not found");
  }

  if (req.user._id.toString() !== room.owner.toString()) {
    throw new ExpressError(
      403,
      "You are not authorized to perform this action",
    );
  }

  const file = await File.findOne({
    room: room._id,
  });

  if (!file) {
    throw new ExpressError(404, "File not found");
  }

  room.roomName = roomName;
  file.fileName = fileName;
  file.language = language;

  await room.save();
  await file.save();

  res.json({
    success: true,
    message: "Room updated successfully",
    roomId: room.roomId,
    fileName: file.fileName,
  });
};

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params;

  const room = await Room.findOne({ roomId });

  if (!room) {
    throw new ExpressError(404, "Room not found");
  }

  if (!room.owner.equals(req.user._id)) {
    throw new ExpressError(
      403,
      "You are not authorized to perform this action",
    );
  }

  if (room.file) {
    await File.findByIdAndDelete(room.file);
  }

  await Room.findByIdAndDelete(room._id);

  await User.updateMany(
    {},
    {
      $pull: {
        myRooms: {
          room: room._id,
        },
      },
    },
  );

  await User.updateMany(
    {},
    {
      $pull: {
        recentRooms: {
          room: room._id,
        },
      },
    },
  );

  res.json({
    success: true,
    message: "Room deleted successfully",
  });
};
