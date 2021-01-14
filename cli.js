#!/usr/bin/env node

"use strict";

const commander = require("commander");
const packageJson = require("./package.json");
const descriptions = require("./dist/descriptions");
const actions = require("./actions");

commander.version(packageJson.version);

commander.name(packageJson.name);

commander
  .command("init")
  .option("-f, --force", descriptions.force)
  .option("-p, --path <path>", descriptions.path)
  .description(descriptions.init)
  .action(actions.init);

commander
  .command("import-from-figma")
  .option("-t, --no-separated-tokens", descriptions.noSeparatedTokens)
  .option("-c, --convert", descriptions.postImport)
  .option("-m, --module <name>", descriptions.module)
  .description(descriptions.imports)
  .action(actions.importFromFigma)
  .alias("import");

commander
  .command("convert-tokens")
  .option("-m, --module <name>", descriptions.module)
  .description(descriptions.convert)
  .action(actions.convertTokens)
  .alias("convert");

commander
  .command("link-fonts")
  .description(descriptions.link)
  .action(actions.linkFonts)
  .alias("link");

commander
  .command("all")
  .option("-f, --force", descriptions.force)
  .option("-p, --path <noquote>", descriptions.path)
  .option("-l, --link", descriptions.link)
  .option("-t, --no-separated-tokens", descriptions.noSeparatedTokens)
  .option("-m, --module <name>", descriptions.module)
  .description(descriptions.all)
  .action(actions.doAll);

console.log(packageJson.name + " v" + packageJson.version);

commander.parseAsync().catch((err) => {
  console.error(`${err.name}\n${err.stack}`);
  process.exit(1);
});
