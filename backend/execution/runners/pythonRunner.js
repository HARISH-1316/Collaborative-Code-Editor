import runDocker from "./dockerRunner.js";

export const runPython = (workspacePath) => {
  return runDocker(workspacePath, "python-runner", "python main.py");
};
