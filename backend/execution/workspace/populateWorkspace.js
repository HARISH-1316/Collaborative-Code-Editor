import fs from "fs/promises";
import path from "path";

const extensions = {
  javascript: "js",
  typescript: "ts",
  java: "java",
  cpp: "cpp",
  c: "c",
};

export const populateProject = async (
  fileName,
  fileLanguage,
  fileContent,
  workspacePath,
) => {
  const filePath = path.join(
    workspacePath,
    fileName + `.${extensions[fileLanguage]}`,
  );

  await fs.writeFile(filePath, fileContent);

  console.log("Completed");
};
