import { runDocker } from "./dockerRunner.js";

export const runCpp = (workspacePath, input) => {
  return runDocker(
    input,
    workspacePath,
    "cpp-runner",
    "g++ main.cpp -o main && ./main",
  );
};
