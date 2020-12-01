const chalk = require("chalk");
const path = require("path");
const { existsSync, mkdirSync, createWriteStream } = require("fs");
const exceptionHandler = require("../exception-handler");
const axios = require("axios").default;
const { spawn } = require("child_process");
const { tab } = require("../etc/functions");
const fontNameCorrector = require("./font-name-corrector");
const config = require("../config-handler").handle();

function link() {
  fontNameCorrector();

  console.log(
    chalk.greenBright("\ninfo"),
    "Running",
    chalk.blueBright(config.fonts.linkCommand)
  );

  let [manager, ...commands] = config.fonts.linkCommand.split(" ");

  let packageManager = spawn(manager, commands, {
    shell: process.env.OS && process.env.OS.includes("Windows"),
  });

  packageManager.stdout.on("data", (chunk) => {
    console.log(tab(1), chunk.toString("utf-8").replace("\n", ""));
  });

  packageManager.stderr.on("data", (chunk) =>
    exceptionHandler(new Error(chunk.toString("utf-8")))
  );

  packageManager.on("error", exceptionHandler);

  packageManager.on("close", (code) =>
    console.log("\nYarn executed with exit code " + code)
  );
}

module.exports = (fonts) => {
  let outPath = path.resolve(process.cwd(), config.fonts.output);

  if (!existsSync(outPath)) mkdirSync(outPath, { recursive: true });

  fonts.forEach(async (font, index, fontArray) => {
    let out = path.resolve(outPath, `./${font.local}`);

    console.log(
      chalk.greenBright("\ninfo"),
      "Downloading from",
      chalk.gray(font.src)
    );

    try {
      let { data } = await axios.get(font.src, {
        responseType: "stream",
      });

      data.pipe(createWriteStream(out));
    } catch (err) {
      exceptionHandler(err, `error thrown when fetching ${font.src}`);
    }

    if (index + 1 == fontArray.length) link();
  });
};
