const chalk = require("chalk");

exports.convert = "Convert style tokens";

exports.link =
  "Download and link fonts using " + chalk.blueBright("yarn react-native link");

exports.init = "Generate sample " + chalk.greenBright("jota-web.config.js");

exports.force = "Can be used to reset the configuration.";

exports.module = "Handle a specific module";

exports.import = "Generate tokens from Figma";

exports.postImport = "Convert tokens after import";

exports.all = "Execute all commands";
