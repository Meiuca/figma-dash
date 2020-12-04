const path = require("path");
const configHandler = require("figma-dash-core/config-handler");
const pathToSrc = path.resolve(__dirname, "../defaults/user.config.js");
const chalk = require("chalk");
const figlet = require("figlet");
const { existsSync, copyFileSync } = require("fs");
const { tab } = require("figma-dash-core/functions");
const { capitalize, upperCase } = require("lodash");
const packageJson = require("../package.json");

const parsedName = packageJson.name.split(/-|[A-Z]/);
const blockName = parsedName
  .map((str, index) => upperCase(str) + "\n" + "  ".repeat(index + 1))
  .join("");

module.exports = (args) => {
  if (!existsSync(configHandler.path) || args.force) {
    console.log(
      chalk.bold.green(figlet.textSync(blockName, "JS Block Letters")),
      `\n\n${tab((parsedName.length - 1) * 3)}Welcome\n\n`,
      "Initialized with sample configuration"
    );

    copyFileSync(pathToSrc, configHandler.path);
  } else {
    console.log(
      "\n",
      chalk.greenBright("info"),
      parsedName.map(capitalize).join(" ") + " config file already exists.\n"
    );
  }
};
