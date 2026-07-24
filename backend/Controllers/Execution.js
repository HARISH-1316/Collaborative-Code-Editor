import { runCpp } from "../execution/runners/cppRunner.js";
import { runJava } from "../execution/runners/javaRunner.js";
import { runJS } from "../execution/runners/jsRunner.js";
import { runPython } from "../execution/runners/pythonRunner.js";
import { runTS } from "../execution/runners/tsRunner.js";
import { cleanupWorkspace } from "../execution/workspace/cleanupWorkspace.js";
import { createProject } from "../execution/workspace/createWorkspace.js";
import { populateProject } from "../execution/workspace/populateWorkspace.js";
import File from "../Models/File.js";
import Room from "../Models/Room.js";

const runners = {
  java: runJava,
  cpp: runCpp,
  python: runPython,
  javascript: runJS,
  typescript: runTS,
};

export const executeCode = async (req, res, next) => {
  const { roomId } = req.params;
  let { input } = req.body;
  // input = input.trim();
  console.log(input + "()()()()()()()()()()()(()()()()()()()");
  const room = await Room.findOne({ roomId });
  const file = await File.findOne({ room: room.id });

  console.log("controller");

  const workspacePath = await createProject(roomId);

  await populateProject(
    file.fileName,
    file.language,
    file.content,
    workspacePath,
  );

  const runner = runners[file.language];

  const { verdict, exitCode, stdout, stderr } = await runner(
    workspacePath,
    input,
    file.fileName,
  );

  console.log(file.fileName);

  console.log(stdout, stderr);
  console.log(")()(");

  await cleanupWorkspace(workspacePath);

  res.json({
    success: true,
    message: "Executed Successfully",
    verdict,
    exitCode,
    stdout,
    stderr,
  });
};
