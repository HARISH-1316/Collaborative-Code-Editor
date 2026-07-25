import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Rooms created/owned by the user
    myRooms: [
      {
        room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Rooms joined by the user
    recentRooms: [
      {
        room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
          required: true,
        },

        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model("User", userSchema);

export default User;
