import express from "express";
import passport from "passport";

import {
  postSignup,
  postLogin,
  logout,
  checkAuth,
  me,
} from "../Controllers/User.js";

import { isLoggedIn, validateSignup, validateLogin } from "../Middleware.js";

import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

/* ==========================
   Signup
========================== */
router.post("/auth/signup", validateSignup, wrapAsync(postSignup));

/* ==========================
   Login
========================== */
router.post(
  "/auth/login",
  validateLogin,
  passport.authenticate("local", {
    failWithError: true,
  }),
  wrapAsync(postLogin),
  (err, req, res, next) => {
    return res.status(401).json({
      success: false,
      code: "INVALID_CREDENTIALS",
      message: "Incorrect username or password",
    });
  },
);

/* ==========================
   Logout
========================== */
router.get("/auth/logout", wrapAsync(logout));

/* ==========================
   Current User
========================== */
router.get("/auth/me", wrapAsync(me));

/* ==========================
   Check Authentication
========================== */
router.get("/checkAuth", isLoggedIn, wrapAsync(checkAuth));

export default router;
