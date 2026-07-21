import runDocker from "./dockerRunner.js";

export const runJS = (workspacePath) => {
  return runDocker(workspacePath, "js-runner", "node main.js");
};
