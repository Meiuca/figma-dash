import path from "path";
import chalk from "chalk";
import runStyleDictionary from "./style-dictionary";
import MeiucaEngine from "./index";
import { Meta } from "../types";
import MeiucaEngineCore, { MeiucaEngineError } from "meiuca-engine-core";

const excludedObjects = ["fonts", "figma", "patterns", "globals"];

function log(module: string, meta: Meta[], core: MeiucaEngineCore) {
  if (excludedObjects.includes(module)) return;

  let moduleInfo = core.config[module];

  if (!moduleInfo)
    throw new MeiucaEngineError(`module ${module} does not exist`);

  console.log("\n", chalk.greenBright("info"), "Converting module:", module);

  runStyleDictionary(meta, module, moduleInfo, core);
}

export default function (
  this: MeiucaEngine,
  args: import("../types/meiuca-engine").ConvertArgs = {}
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
