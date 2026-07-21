import runDocker from "./dockerRunner.js";

export const runJava = (workspacePath) => {
  console.log("runJava");
  return runDocker(
    workspacePath,
    "java-runner",
    "javac Main.java && java Main",
  );
};
