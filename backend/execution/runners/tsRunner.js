import { runDocker } from "./dockerRunner.js";

export const runTS = (workspacePath, input) => {
  return runDocker(input, workspacePath, "ts-runner", "tsx main.ts");
};
