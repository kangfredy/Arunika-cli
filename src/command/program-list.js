#!/usr/bin/env node

import { program } from "commander";
import { createModule } from "../module/create-module.js";

program.version("1.0.0").description("Arunika CLI");

program
  .command("new <project-name>")
  .description("Create new project")
  .action((projectName) => {
    createModule(projectName);
  });

program.parse(process.argv);
