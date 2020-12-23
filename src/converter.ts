import path from "path";
import chalk from "chalk";
import runStyleDictionary from "./style-dictionary";
import { handle } from "figma-dash-core/config-handler";

const config = handle();

const meta = require(path.resolve(config.figma.output, "./meta.json"));

const excludedObjects = ["fonts", "figma", "patterns", "ds"];

function log(module: string) {
  if (excludedObjects.includes(module)) return;

  console.log("\n", chalk.greenBright("info"), "Converting module:", module);

  runStyleDictionary(meta, module, config[module]);
}

export default function (args: import("../types/figma-dash").ConvertArgs) {
  if (args.module) {
    log(args.module);
  } else {
    Object.keys(config).forEach(log);
  }
}
