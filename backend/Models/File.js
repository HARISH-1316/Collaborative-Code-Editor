import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      unique: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      default: "javascript",
    },

    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const File = new mongoose.model("File", fileSchema);

export default File;
