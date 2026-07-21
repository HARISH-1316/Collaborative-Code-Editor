import runDocker from "./dockerRunner.js";

export const runJS = (workspacePath) => {
  console.log("runJS");
  return runDocker(workspacePath, "js-runner", "node index.js");
};
