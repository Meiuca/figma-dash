const path = require("path");
const chalk = require("chalk");
const {
  runStyleDictionary,
  registerNativeTransformer,
} = require("./style-dictionary");
const config = require("figma-dash-core/config-handler").handle();

function log(module) {
  if (module == "fonts" || module == "figma" || module == "patterns") return;

  if (module == "native") {
    registerNativeTransformer();
  }

  console.log("\n", chalk.greenBright("info"), "converting module:", module);

  let pathToMeta = path.resolve(config.figma.output, "./meta.json");

  let meta = require(pathToMeta);

  runStyleDictionary(meta, module, config[module]);
}

module.exports = (args) => {
  if (args.module) {
    log(args.module);
  } else {
    Object.keys(config).forEach(log);
  }
};
