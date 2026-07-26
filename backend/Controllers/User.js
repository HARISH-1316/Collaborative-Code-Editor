import { connections } from "mongoose";
import User from "../Models/User.js";

export const postSignup = async (req, res, next) => {
  const { username, email, phone, password } = req.body;

  const newUser = {
    username,
    email,
    phone,
  };

  const registeredUser = await User.register(newUser, password);

  req.login(registeredUser, (err) => {
    if (err) return next(err);
    req.session.save((err) => {
      if (err) return next(err);

      res.json({
        success: true,
        message: "signup successful",
      });
    });
  });
};

export const postLogin = async (req, res, next) => {
  req.session.save((err) => {
    if (err) return next(err);
    res.json({ success: true, message: "login successful" });
  });
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({
      success: true,
      message: "User successfully logged out",
    });
  });
};

export const me = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.user._id)
      .populate({
        path: "myRooms.room",
        select: "roomId roomName file",
        populate: {
          path: "file",
          select: "fileName language",
        },
      })
      .populate({
        path: "recentRooms.room",
        select: "roomId roomName file",
        populate: {
          path: "file",
          select: "fileName language",
        },
      });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      username: user.username,
      myRooms: user.myRooms,
      recentRooms: user.recentRooms,
    });
  } catch (error) {
    next(error);
  }
};

export const checkAuth = (req, res, next) => {
  res.json({
    success: true,
    message: "User is Authenticated",
  });
};
