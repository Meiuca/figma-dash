const path = require("path");
const configHandler = require("figma-dash-core/config-handler");
const pathToSrc = path.resolve(__dirname, "../defaults/figma-dash.config.js");
const chalk = require("chalk");
const figlet = require("figlet");
const { existsSync, copyFileSync } = require("fs");
const { tab } = require("figma-dash-core/functions");

module.exports = (args) => {
  if (!existsSync(configHandler.path) || args.force) {
    console.log(
      chalk.blueBright(figlet.textSync(`FIGMA\n   DASH`, "JS Block Letters")),
      `\n\n\n${tab(3)}Welcome\n\n\n`,
      "Initialized with sample configuration"
    );

    copyFileSync(pathToSrc, configHandler.path);
  } else {
    console.log(
      "\n",
      chalk.greenBright("info"),
      "Figma Dash config file already exists.\n"
    );
  }
};
