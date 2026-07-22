import { runDocker } from "./dockerRunner.js";

export const runPython = (workspacePath, input) => {
  return runDocker(input, workspacePath, "python-runner", "python main.py");
};
