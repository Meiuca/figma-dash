import path from "path";
import chalk from "chalk";
import figlet from "figlet";
import { prompt } from "inquirer";
import { existsSync, copyFileSync, mkdirSync } from "fs";
import MeiucaEngine from "./index";

export default async function (
  args: import("../types/meiuca-engine").InitArgs = {}
) {
  if (args.path && !existsSync(args.path))
    mkdirSync(args.path, { recursive: true });

  let pathToSrc = path.resolve(__dirname, "../defaults/config.js");
  let pathToDest = path.resolve(args.path || "./", "./meiuca-engine.config.js");

  if (!existsSync(pathToDest) || args.force) {
    console.log(
      chalk.bold.green(figlet.textSync("MEIUCA ENGINE", "JS Block Letters")),
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
      "Meiuca Engine config file already exists.\n"
    );
  }

  if (args.path) process.chdir(args.path);

  return new MeiucaEngine();
}
