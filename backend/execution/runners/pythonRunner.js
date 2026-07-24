import { runDocker } from "./dockerRunner.js";

export const runPython = (workspacePath, input, fileName) => {
  return runDocker(
    input,
    workspacePath,
    "python-runner",
    `python ${fileName}.py`,
  );
};
