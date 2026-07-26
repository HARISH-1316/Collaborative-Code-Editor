import { runDocker } from "./dockerRunner.js";

export const runC = (workspacePath, input, fileName) => {
  return runDocker(
    input,
    workspacePath,
    "c-runner",
    `gcc ${fileName}.c -o ${fileName} && ./${fileName}`,
  );
};
