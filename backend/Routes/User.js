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
    failWithError: true,
  }),
  postLogin,
  (err, req, res, next) => {
    return res.status(401).json({
      success: false,
      code: "INVALID_CREDENTIALS",
      message: "Incorrect username or password",
    });
  },
);
router.get("/logout", logout);

router.get("/checkAuth", isLoggedIn, checkAuth);

export default router;
