import express from "express";
import passport from "passport";
import { postSignup, postLogin } from "../Controllers/User.js";

const router = express.Router();

router.post("/signup", postSignup);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  postLogin,
);

export default router;
