import fs from "fs/promises";

export const cleanupWorkspace = async (workspacePath) => {
  await fs.rm(workspacePath, {
    recursive: true,
    force: true,
  });
};
