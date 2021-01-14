import chalk from "chalk";

export const path =
  "The path where the config file will be placed. If ommited the system will resolve to the cwd";

export const convert = "Convert style tokens";

export const link = "Download and link fonts";

export const init =
  "Generate sample " + chalk.greenBright("meiuca-engine.config.js");

export const force = "Can be used to reset the configuration";

export const module = "Handle a specific module";

export const imports = "Generate tokens from Figma";

export const postImport = "Convert tokens after import";

export const all = "Execute all commands";

export const noSeparatedTokens =
  "If this flag is set the api will not generate separated files for each category and item";
