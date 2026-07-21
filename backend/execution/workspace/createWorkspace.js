import fs from "fs/promises";
import path from "path";
import { populateProject } from "./populateWorkspace.js";

export const createProject = async (roomId) => {
  const workspacePath = path.join(
    process.cwd(),
    "execution",
    "tempProject",
    roomId,
  );

  await fs.mkdir(workspacePath, {
    recursive: true,
  });

  console.log(workspacePath);

  return workspacePath;
};
