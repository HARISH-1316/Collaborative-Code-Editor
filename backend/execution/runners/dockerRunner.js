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
      console.log("STDOUT:", data.toString());
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      console.log("STDERR:", data.toString());
      stderr += data.toString();
    });

    docker.on("exit", (code, signal) => {
      console.log("EXIT", code, signal);
    });

    docker.on("close", (code, signal) => {
      console.log("CLOSE", code, signal);

      resolve({
        exitCode: code,
        stdout,
        stderr,
      });
    });

    // docker.on("close", (code) => {
    //   resolve({
    //     exitCode: code,
    //     stdout,
    //     stderr,
    //   });
    // });
  });
}
