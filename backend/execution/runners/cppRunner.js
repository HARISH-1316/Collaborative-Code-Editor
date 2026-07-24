import { runDocker } from "./dockerRunner.js";

export const runCpp = (workspacePath, input, fileName) => {
  return runDocker(
    input,
    workspacePath,
    "cpp-runner",
    `g++ ${fileName}.cpp -o ${fileName} && ./${fileName}`,
  );
};
