import express from "express";
import passport from "passport";
import {
  postSignup,
  postLogin,
  logout,
  checkAuth,
  me,
} from "../Controllers/User.js";
import { isLoggedIn } from "../Middleware.js";

const router = express.Router();

router.post("/auth/signup", postSignup);

router.post(
  "/auth/login",
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
router.get("/auth/logout", logout);

router.get("/auth/me", me);

router.get("/checkAuth", isLoggedIn, checkAuth);

export default router;
