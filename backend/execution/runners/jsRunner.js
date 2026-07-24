import { runDocker } from "./dockerRunner.js";

export const runJS = (workspacePath, input, fileName) => {
  console.log("runJS");
  return runDocker(input, workspacePath, "js-runner", `node ${fileName}.js`);
};
