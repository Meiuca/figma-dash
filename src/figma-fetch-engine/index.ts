import { writeFileSync, existsSync, mkdirSync } from "fs";
import axios from "axios";
import lodash from "lodash";
import prettier from "prettier";
import handleChildren from "./data-handler";
import path from "path";
import chalk from "chalk";
import subdivideTarget from "./target-subdivider";
import FigmaDash from "../index";
import { Target } from "../../types";

export default async function (
  this: FigmaDash,
  args: import("../../types/figma-dash").ImportArgs = {}
) {
  let figmaUrl = "";

  const {
    core: {
      config: { figma },
      validations: { validateFigmaConfig },
    },
  } = this;

  try {
    validateFigmaConfig();

    console.log(
      "\n",
      chalk.greenBright("info"),
      "Importing from ID",
      chalk.gray(figma.fileID),
      "with access token",
      chalk.gray(figma.accessToken),
      "to",
      chalk.gray(path.resolve(figma.output))
    );

    figmaUrl = "https://api.figma.com/v1/files/" + figma.fileID;

    let { data } = await axios.get(
      figmaUrl,

      {
        method: "GET",
        headers: {
          "X-Figma-Token": figma.accessToken,
        },
      }
    );

    if (!existsSync(figma.output)) mkdirSync(figma.output, { recursive: true });

    let outputPath = path.resolve(figma.output, "./tokens.json");

    let target = lodash.merge(
      {},
      ...handleChildren(data.document, this.core)
    ) as Target;

    writeFileSync(
      outputPath,
      prettier.format(JSON.stringify(target), {
        parser: "json",
      })
    );

    let output = [{ src: outputPath, filename: "tokens" }];

    if (args.separatedTokens) subdivideTarget(target, output, this.core);

    writeFileSync(
      path.resolve(figma.output, "./meta.json"),
      prettier.format(JSON.stringify(output), {
        parser: "json",
      })
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
    // this.core.exceptionHandler(err, `error thrown when fetching ${figmaUrl}`);
  }

  console.log("\n", chalk.greenBright("info"), "Tokens successfully imported");

  if (args.convert) this.convertTokens(args);
}
