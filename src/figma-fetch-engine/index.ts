import { writeFileSync, existsSync, mkdirSync } from "fs";
import axios from "axios";
import lodash from "lodash";
import prettier from "prettier";
import { ConfigHandler, ExceptionHandler, Validations } from "figma-dash-core";
import handleChildren from "./data-handler";
import path from "path";
import chalk from "chalk";
import subdivideTarget from "./target-subdivider";

const config = ConfigHandler.handle();

export default async function (
  args: import("../../types/figma-dash").ImportArgs
) {
  let figmaUrl = "";

  try {
    Validations.validateFigmaConfig();

    console.log(
      "\n",
      chalk.greenBright("info"),
      "Importing from ID",
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

    if (!existsSync(config.figma.output))
      mkdirSync(config.figma.output, { recursive: true });

    let outputPath = path.resolve(config.figma.output, "./tokens.json");

    let target = lodash.merge({}, ...handleChildren(data.document));

    writeFileSync(
      outputPath,
      prettier.format(JSON.stringify(target), {
        parser: "json",
      })
    );

    let output = [{ src: outputPath, filename: "tokens" }];

    if (args.separatedTokens) subdivideTarget(target, output);

    writeFileSync(
      path.resolve(config.figma.output, "./meta.json"),
      prettier.format(JSON.stringify(output), {
        parser: "json",
      })
    );
  } catch (err) {
    ExceptionHandler(err, `error thrown when fetching ${figmaUrl}`);
  }

  console.log("\n", chalk.greenBright("info"), "Tokens successfully imported");
}
