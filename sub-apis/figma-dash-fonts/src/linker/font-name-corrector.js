const { readdirSync, renameSync } = require("fs");
const opentype = require("opentype.js");
const exceptionHandler = require("../exception-handler");

module.exports = () => {
  try {
    readdirSync("./assets/fonts").forEach((file) => {
      if (file.includes("ttf") || file.includes("otf")) {
        postScriptName = opentype.loadSync("./assets/fonts/" + file).tables.name
          .postScriptName.en;

        renameSync(
          "./assets/fonts/" + file,
          `./assets/fonts/${postScriptName}.${/[^.]+$/.exec(file)[0]}`
        );
      }
    });
  } catch (err) {
    exceptionHandler(err);
  }
};
