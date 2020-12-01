#!/usr/bin/env node

const commander = require("commander");
const packageJson = require("./package.json");

const descriptions = require("./src/descriptions");
const actions = require("./actions");

commander.version(packageJson.version);

commander
  .command("init")
  .option("-f, --force", descriptions.force)
  .description(descriptions.init)
  .action(actions.init);

commander
  .command("import-from-figma")
  .option("-c, --convert", descriptions.postImport)
  .option("-m, --module <name>", descriptions.module)
  .description(descriptions.import)
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
  .option("-l, --link", descriptions.link)
  .option("-m, --module <name>", descriptions.module)
  .description(descriptions.all)
  .action(actions.doAll);

console.log("figma-dash v" + packageJson.version);

commander.parse(process.argv);
