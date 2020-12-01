const { writeFileSync, existsSync, mkdirSync } = require("fs");
const axios = require("axios").default;
const lodash = require("lodash");
const prettier = require("prettier");
const config = require("figma-dash-core/config-handler").handle();
const { getOutArray, handleChildren } = require("../figma-data-handler");
const path = require("path");
const exceptionHandler = require("figma-dash-core/exception-handler");
const chalk = require("chalk");
const { validateFigmaConfig } = require("figma-dash-core/validations");
const subdivideTarget = require("./target-subdivider");

module.exports = async () => {
  let figmaUrl;

  try {
    validateFigmaConfig();

    console.log(
      "\n",
      chalk.greenBright("info"),
      "importing from ID",
      chalk.gray(config.figma.fileID),
      "with access token",
      chalk.gray(config.figma.accessToken),
      "to",
      chalk.gray(path.resolve(config.figma.output))
    );

    figmaUrl = "https://api.figma.com/v1/files/" + config.figma.fileID;

    let { data } = await axios.get(
      figmaUrl,

      {
        method: "GET",
        headers: {
          "X-Figma-Token": config.figma.accessToken,
        },
      }
    );

    handleChildren(data.document);

    if (!existsSync(config.figma.output))
      mkdirSync(config.figma.output, { recursive: true });

    let outputPath = path.resolve(config.figma.output, "./tokens.json");

    let target = {};

    target = lodash.merge(target, ...getOutArray());

    writeFileSync(
      outputPath,
      prettier.format(JSON.stringify(target), {
        parser: "json",
      })
    );

    let output = [{ src: outputPath, filename: "tokens" }];

    subdivideTarget(target, output);

    writeFileSync(
      path.resolve(config.figma.output, "./meta.json"),
      prettier.format(JSON.stringify(output), {
        parser: "json",
      })
    );
  } catch (err) {
    exceptionHandler(err, `error thrown when fetching ${figmaUrl}`);
  }

  console.log("\n", chalk.greenBright("info"), "tokens successfully imported");
};
