import express from "express";
import { isLoggedIn } from "../Middleware.js";
import { executeCode } from "../Controllers/Execution.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/editor/:roomId/execute", isLoggedIn, wrapAsync(executeCode));

export default router;
