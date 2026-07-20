import express from "express";
import { isLoggedIn } from "../Middleware.js";
import { executeCode } from "../Controllers/Execution.js";

const router = express.Router();

router.post("/editor/:roomId/execute", executeCode);

export default router;
