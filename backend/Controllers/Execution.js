import { runCpp } from "../execution/runners/cppRunner.js";
import { runJava } from "../execution/runners/javaRunner.js";
import { runJS } from "../execution/runners/jsRunner.js";
import { runPython } from "../execution/runners/pythonRunner.js";
import { runC } from "../execution/runners/cRunner.js";

import { cleanupWorkspace } from "../execution/workspace/cleanupWorkspace.js";
import { createProject } from "../execution/workspace/createWorkspace.js";
import { populateProject } from "../execution/workspace/populateWorkspace.js";

import File from "../Models/File.js";
import Room from "../Models/Room.js";
import ExpressError from "../utils/ExpressError.js";

const runners = {
  java: runJava,
  cpp: runCpp,
  python: runPython,
  javascript: runJS,
  c: runC,
};

export const executeCode = async (req, res) => {
  const { roomId } = req.params;
  const { input = "" } = req.body;
  console.log(roomId);

  const room = await Room.findOne({ roomId });

  if (!room) {
    throw new ExpressError(404, "Room not found");
  }

  const file = await File.findOne({
    room: room._id,
  });

  if (!file) {
    throw new ExpressError(404, "File not found");
  }

  const runner = runners[file.language];

  if (!runner) {
    throw new ExpressError(400, `Unsupported language: ${file.language}`);
  }

  let workspacePath;

  try {
    workspacePath = await createProject(roomId);

    await populateProject(
      file.fileName,
      file.language,
      file.content,
      workspacePath,
    );

    const { verdict, exitCode, stdout, stderr } = await runner(
      workspacePath,
      input,
      file.fileName,
    );

    res.json({
      success: true,
      message: "Executed Successfully",
      verdict,
      exitCode,
      stdout,
      stderr,
    });
  } finally {
    if (workspacePath) {
      await cleanupWorkspace(workspacePath);
    }
  }
};
