import { runDocker } from "./dockerRunner.js";

export const runJava = (workspacePath, input) => {
  console.log("runJava");
  return runDocker(
    input,
    workspacePath,
    "java-runner",
    "javac Main.java && java Main",
  );
};
