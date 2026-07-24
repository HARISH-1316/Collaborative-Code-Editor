import { runDocker } from "./dockerRunner.js";

export const runTS = (workspacePath, input, fileName) => {
  return runDocker(input, workspacePath, "ts-runner", `tsx ${fileName}.ts`);
};
