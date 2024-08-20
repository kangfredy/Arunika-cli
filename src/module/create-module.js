import path from "path";
import fs from "fs";
import { execSync } from "child_process";

export const createModule = (projectName) => {
  console.log(`Creating new project: ${projectName}`);
  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(`Project ${projectName} already exists`);
    process.exit(1);
  }
  fs.mkdirSync(projectPath);
  const repoUrl = "https://github.com/kangfredy/Arunika.git";
  try {
    execSync(`git clone ${repoUrl} ${projectPath}`);
    const gitFolder = path.join(projectPath, ".git");
    fs.rmSync(gitFolder, { recursive: true, force: true });
    const bunLockFile = path.join(projectPath, "bun.lockb");
    if (fs.existsSync(bunLockFile)) {
      fs.unlinkSync(bunLockFile);
    }
    const packageJsonPath = path.join(projectPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      packageJson.name = projectName;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
    console.log(`Project ${projectName} created successfully`);
  } catch (error) {
    console.error(`Failed to clone repository: ${error}`);
    process.exit(1);
  }
};
