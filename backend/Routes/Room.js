import express from "express";
import { isLoggedIn } from "../Middleware.js";
import {
  getLobby,
  getRoom,
  postCode,
  postRoomFile,
} from "../Controllers/Room.js";

const router = express.Router();

router.get("/lobby", isLoggedIn, getLobby);

router.post("/editor", isLoggedIn, postRoomFile);

router
  .route("/editor/:roomId/file/:fileName")
  .get(isLoggedIn, getRoom)
  .post(isLoggedIn, postCode);

export default router;
