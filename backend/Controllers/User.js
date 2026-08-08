import User from "../Models/User.js";
import ExpressError from "../utils/ExpressError.js";

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
        message: "Signup successful",
      });
    });
  });
};

export const postLogin = async (req, res, next) => {
  req.session.save((err) => {
    if (err) return next(err);

    res.json({
      success: true,
      message: "Login successful",
    });
  });
};

export const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.json({
      success: true,
      message: "User successfully logged out",
    });
  });
};

export const me = async (req, res) => {
  if (!req.user) {
    throw new ExpressError(401, "Unauthorized");
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
    throw new ExpressError(404, "User not found");
  }

  res.json({
    success: true,
    username: user.username,
    myRooms: user.myRooms,
    recentRooms: user.recentRooms,
  });
};

export const checkAuth = async (req, res) => {
  res.json({
    success: true,
    message: "User is authenticated",
  });
};
