#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import fs from "fs";

program.version("1.0.0").description("Arunika CLI");

program
  .command("new <project-name>")
  .description("Create new project")
  .action((projectName) => {
    console.log(`Creating new project: ${projectName}`);
    const projectPath = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectPath)) {
      console.error(`Project ${projectName} already exists`);
      process.exit(1);
    }
    fs.mkdirSync(projectPath);
    console.log(`Project ${projectName} created successfully`);
  });

program.parse(process.argv);
