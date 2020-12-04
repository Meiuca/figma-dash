const chalk = require("chalk");
const packageJson = require("../package.json");

exports.convert = "Convert style tokens";

exports.link = "Download and link fonts";

exports.init =
  "Generate sample " + chalk.greenBright(packageJson.name + ".config.js");

exports.force = "Can be used to reset the configuration.";

exports.module = "Handle a specific module";

exports.import = "Generate tokens from Figma";

exports.postImport = "Convert tokens after import";

exports.all = "Execute all commands";

exports.noSeparatedTokens =
  "If this flag is set the api will not generate separated files for each category and item";
