import runDocker from "./dockerRunner.js";

export const runCpp = (workspacePath) => {
  return runDocker(
    workspacePath,
    "cpp-runner",
    "g++ main.cpp -o main && ./main",
  );
};
