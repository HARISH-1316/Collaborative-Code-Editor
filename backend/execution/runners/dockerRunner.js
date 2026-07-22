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

    let timeOut = false;
    const timer = setTimeout(() => {
      timeOut = true;
      docker.kill();
    }, 5000);

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

    docker.on("close", (code, signal) => {
      clearTimeout(timer);
      stdout = stdout.trimEnd();
      stderr = stderr.trimEnd();

      if (timeOut) {
        resolve({
          verdict: "TLE",
          exitCode: null,
          stdout: "",
          stderr: "Time Limit Exceeded <TLE>",
        });
      } else {
        resolve({
          verdict: "OK",
          exitCode: code,
          stdout,
          stderr,
        });
      }
    });
  });
};
