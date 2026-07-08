import express from "express";
import passport from "passport";
import {
  postSignup,
  postLogin,
  logout,
  checkAuth,
} from "../Controllers/User.js";
import { isLoggedIn } from "../Middleware.js";

const router = express.Router();

router.post("/signup", postSignup);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  postLogin,
);

router.get("/logout", logout);

router.get("/checkAuth", isLoggedIn, checkAuth);

export default router;
