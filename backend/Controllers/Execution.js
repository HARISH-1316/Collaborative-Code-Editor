import { createProject } from "../execution/workspace/createWorkspace.js";
export const executeCode = (req, res, next) => {
  console.log("controller");
  createProject();
};
