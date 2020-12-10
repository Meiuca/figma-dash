const path = require("path");
const chalk = require("chalk");
const runStyleDictionary = require("./style-dictionary");
const config = require("figma-dash-core/config-handler").handle();

const meta = require(path.resolve(config.figma.output, "./meta.json"));

const excludedObjects = ["fonts", "figma", "patterns", "ds"];

function log(module) {
  if (excludedObjects.includes(module)) return;

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
