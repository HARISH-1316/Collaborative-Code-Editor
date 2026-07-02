import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Room = new mongoose.model("Room", roomSchema);

export default Room;
