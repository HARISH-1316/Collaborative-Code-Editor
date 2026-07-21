import { spawn } from "child_process";

export default function runDocker(workspacePath, imageName, command) {
  console.log("dockerRunner");
  return new Promise((resolve, reject) => {
    const docker = spawn("docker", [
      "run",
      "--rm",

      "-v",
      `${workspacePath}:/workspace`,

      "-w",
      "/workspace",

      imageName,

      "bash",
      "-c",
      command,
    ]);

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    docker.on("error", (err) => {
      reject(err);
    });

    docker.on("close", (code) => {
      resolve({
        exitCode: code,
        stdout,
        stderr,
      });
    });
  });
}
