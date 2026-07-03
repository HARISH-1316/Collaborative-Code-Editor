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
      console.log(req.session);
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
