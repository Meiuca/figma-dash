const path = require("path");
const chalk = require("chalk");
const {
  runStyleDictionary,
  registerNativeTransformer,
  registerDefaultTransformer,
} = require("./style-dictionary");
const config = require("figma-dash-core/config-handler").handle();

const meta = require(path.resolve(config.figma.output, "./meta.json"));

function log(module) {
  if (module == "fonts" || module == "figma" || module == "patterns") return;

  if (module == "native") {
    registerNativeTransformer();
  }

  if (module == "default") {
    registerDefaultTransformer();
  }

  console.log("\n", chalk.greenBright("info"), "Converting module:", module);

  runStyleDictionary(meta, module, config[module]);
}

module.exports = (args) => {
  if (args.module) {
    log(args.module);
  } else {
    Object.keys(config).forEach(log);
  }
};
