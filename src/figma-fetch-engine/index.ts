import { writeFileSync, existsSync, mkdirSync } from "fs";
import axios from "axios";
import lodash from "lodash";
import prettier from "prettier";
import handleChildren from "./data-handler";
import path from "path";
import chalk from "chalk";
import subdivideTarget from "./target-subdivider";
import MeiucaEngine from "../index";
import { Target } from "../../types";
import { MeiucaEngineError } from "meiuca-engine-core";

export default async function (
  this: MeiucaEngine,
  args: import("../../types/meiuca-engine").ImportArgs = {}
) {
  let figmaUrl: string | null = "";

  const {
    core: {
      config: { figma },
      functions: { parseFigmaSrc },
      validations: { validateFigmaConfig },
    },
  } = this;

  try {
    validateFigmaConfig();

    let fileID = parseFigmaSrc(figma.src);

    if (!fileID) {
      figmaUrl = null;

      throw new Error(
        `Figma File ID was not parsed correctly. Input: ${figma.src}`
      );
    }

    console.log(
      "\n",
      chalk.greenBright("info"),
      "Importing from ID",
      chalk.gray(fileID),
      "with access token",
      chalk.gray(figma.accessToken),
      "to",
      chalk.gray(path.resolve(figma.output))
    );

    figmaUrl = "https://api.figma.com/v1/files/" + fileID;

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
    throw new MeiucaEngineError(err, `error thrown when fetching ${figmaUrl}`);
  }

  console.log("\n", chalk.greenBright("info"), "Tokens successfully imported");

  if (args.convert) this.convertTokens(args);
}
