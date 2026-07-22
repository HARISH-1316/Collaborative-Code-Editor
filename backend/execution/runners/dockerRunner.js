import { spawn } from "child_process";

export const runDocker = async (input, workspacePath, imageName, command) => {
  console.log("dockerRunner");
  return new Promise((resolve, reject) => {
    const docker = spawn("docker", [
      "run",
      "--rm",

      "-i",

      "-v",
      `${workspacePath}:/workspace`,

      "-w",
      "/workspace",

      imageName,

      "bash",
      "-c",
      command,
    ]);

    docker.stdin.write(input);

    docker.stdin.end();

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    stdout = stdout.trimEnd();
    stderr = stderr.trimEnd();

    docker.on("close", (code, signal) => {
      resolve({
        exitCode: code,
        stdout,
        stderr,
      });
    });
  });
};
