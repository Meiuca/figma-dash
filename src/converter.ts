import path from "path";
import chalk from "chalk";
import runStyleDictionary from "./style-dictionary";
import FigmaDash from "./index";
import { Meta } from "../types";
import FigmaDashCore, { FigmaDashError } from "figma-dash-core";

const excludedObjects = ["fonts", "figma", "patterns", "globals"];

function log(module: string, meta: Meta[], core: FigmaDashCore) {
  if (excludedObjects.includes(module)) return;

  let moduleInfo = core.config[module];

  if (!moduleInfo) throw new FigmaDashError(`module ${module} does not exist`);

  console.log("\n", chalk.greenBright("info"), "Converting module:", module);

  runStyleDictionary(meta, module, moduleInfo, core);
}

export default function (
  this: FigmaDash,
  args: import("../types/figma-dash").ConvertArgs = {}
) {
  let meta = require(path.resolve(
    this.core.config.figma.output,
    "./meta.json"
  )) as Meta[];

  if (args.module) {
    log(args.module, meta, this.core);
  } else {
    Object.keys(this.core.config).forEach((cf) => log(cf, meta, this.core));
  }
}
