import express from "express";
import { isLoggedIn } from "../Middleware.js";
import { getLobby, getRoom, postRoomFile } from "../Controllers/Room.js";

const router = express.Router();

router.get("/lobby", isLoggedIn, getLobby);

router.post("/editor", postRoomFile);

router.get("/editor/:roomId", getRoom);

export default router;
