import express from "express";
import { isLoggedIn } from "../Middleware.js";
import { getLobby } from "../Controllers/Room.js";

const router = express.Router();

router.get("/lobby", isLoggedIn, getLobby);

export default router;
