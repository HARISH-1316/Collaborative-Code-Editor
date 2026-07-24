import { runDocker } from "./dockerRunner.js";

export const runJava = (workspacePath, input, fileName) => {
  console.log("runJava");
  return runDocker(
    input,
    workspacePath,
    "java-runner",
    `javac ${fileName}.java && java ${fileName}`,
  );
};
