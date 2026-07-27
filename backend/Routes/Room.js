import express from "express";
import { isLoggedIn } from "../Middleware.js";
import {
  deleteRoom,
  editRoom,
  getLobby,
  getRoom,
  postCode,
  postRoomFile,
} from "../Controllers/Room.js";

const router = express.Router();

router.get("/lobby", isLoggedIn, getLobby);

router.post("/editor", isLoggedIn, postRoomFile);

router.route("/editor/:roomId");

router
  .route("/editor/:roomId/file/:fileName")
  .get(isLoggedIn, getRoom)
  .post(isLoggedIn, postCode);

router.patch("/editor/:roomId/file/:fileName/edit", isLoggedIn, editRoom);

router.delete("/editor/:roomId/delete", isLoggedIn, deleteRoom);

export default router;
