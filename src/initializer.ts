import path from "path";
import configHandler from "figma-dash-core/config-handler";
import chalk from "chalk";
import figlet from "figlet";
import { existsSync, copyFileSync } from "fs";
import { tab } from "figma-dash-core/functions";
import { capitalize, upperCase } from "lodash";
import packageJson from "../package.json";

const pathToSrc = path.resolve(__dirname, "../defaults/user.config.js");

const parsedName = packageJson.name.split(/-|[A-Z]/);
const blockName = parsedName
  .map((str, index) => upperCase(str) + "\n" + "  ".repeat(index + 1))
  .join("");

export default function (args: import("../types/figma-dash").InitArgs) {
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
}
