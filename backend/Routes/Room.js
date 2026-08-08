import express from "express";

import {
  isLoggedIn,
  validateCreateRoom,
  validateEditRoom,
} from "../Middleware.js";

import {
  deleteRoom,
  editRoom,
  getRoom,
  postCode,
  postRoomFile,
} from "../Controllers/Room.js";

import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

/* ==========================
   Create Room
========================== */

router.post("/editor", isLoggedIn, validateCreateRoom, wrapAsync(postRoomFile));

/* ==========================
   Get Room / Save Code
========================== */

router
  .route("/editor/:roomId/file/:fileName")
  .get(isLoggedIn, wrapAsync(getRoom))
  .post(isLoggedIn, wrapAsync(postCode));

/* ==========================
   Edit Room
========================== */

router.patch(
  "/editor/:roomId/file/:fileName/edit",
  isLoggedIn,
  validateEditRoom,
  wrapAsync(editRoom),
);

/* ==========================
   Delete Room
========================== */

router.delete("/editor/:roomId/delete", isLoggedIn, wrapAsync(deleteRoom));

export default router;
