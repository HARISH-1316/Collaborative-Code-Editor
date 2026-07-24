import { spawn } from "child_process";

export const runDocker = async (input, workspacePath, imageName, command) => {
  console.log("dockerRunner");
  console.log(input, imageName, workspacePath, command);
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
    console.log("*****");

    let timeOut = false;
    const timer = setTimeout(() => {
      timeOut = true;
      docker.kill();
    }, 5000);

    console.log(input.length, "(*)");

    if (input.length > 0) {
      docker.stdin.write(input);
      console.log("))((");
    }

    docker.stdin.end();

    console.log("()()");

    let stdout = "";
    let stderr = "";

    docker.stdout.on("data", (data) => {
      console.log("((");
      stdout += data.toString();
    });

    docker.stderr.on("data", (data) => {
      console.log("))");
      stderr += data.toString();
    });

    console.log(stdout);
    console.log("((");

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
