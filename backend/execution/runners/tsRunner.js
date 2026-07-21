import runDocker from "./dockerRunner.js";

export const runTS = (workspacePath) => {
  return runDocker(workspacePath, "ts-runner", "tsc main.ts && node main.js");
};
