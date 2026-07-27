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

  // 4. Add the room to the user's myRooms
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

export const getRoom = async (req, res, next) => {
  const { roomId, fileName } = req.params;
  console.log(roomId, fileName);

  const room = await Room.findOne({ roomId }).populate("owner");

  const file = await File.findOne({ room: room.id, fileName });

  if (!room || !file) {
    return res.status(404).json({
      success: false,
      message: "Room not found",
    });
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
    Room: {
      roomId: room.roomId,
      roomName: room.roomName,
      roomOwner: room.owner.username,
      fileName: file.fileName,
      content: file.content,
      language: file.language,
    },
    User: {
      username: req.user.username,
    },
  });
};

export const postCode = async (req, res, next) => {
  const { roomId, fileName } = req.params;
  const { code } = req.body;

  const room = await Room.findOne({ roomId });

  const file = await File.findOneAndUpdate(
    { room: room.id, fileName },
    {
      content: code,
    },
    {
      returnDocument: "after",
    },
  );

  res.json({
    success: true,
    message: "Code Saved successfully",
  });
};

export const editRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { roomName, fileName, language } = req.body;

    // Find the room using the public roomId
    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Update room name
    room.roomName = roomName;

    // Find the file belonging to this room
    const file = await File.findOne({ room: room._id });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    // Update file details
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
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Delete associated file (if your Room has one)
    if (room.file) {
      await File.findByIdAndDelete(room.file);
    }

    // Delete room
    await Room.findByIdAndDelete(room.id);

    // Remove from owner's myRooms
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

    // Remove from everyone's recentRooms
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

    return res.status(200).json({
      success: true,
      message: "Room deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};
