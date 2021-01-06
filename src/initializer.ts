import path from "path";
import chalk from "chalk";
import figlet from "figlet";
import { prompt } from "inquirer";
import { existsSync, copyFileSync } from "fs";
import FigmaDash from "./index";

export default async function (
  args: import("../types/figma-dash").InitArgs = {}
) {
  let pathToSrc = path.resolve(__dirname, "../defaults/config.js");
  let pathToDest = path.resolve(args.path || "./", "./figma-dash.config.js");

  if (!existsSync(pathToDest) || args.force) {
    console.log(
      chalk.bold.green(figlet.textSync("FIGMA DASH", "JS Block Letters")),
      `\n\n\t\t\tWelcome\n\n`,
      "Initialized with sample configuration\n\n"
    );

    copyFileSync(pathToSrc, pathToDest);

    await prompt({
      name: "pause",
      message:
        "Please take a look at your config file, change it according to your need, then come back here and hit enter",
    });
  } else {
    console.log(
      "\n",
      chalk.greenBright("info"),
      "Figma Dash config file already exists.\n"
    );
  }

  return new FigmaDash();
}
