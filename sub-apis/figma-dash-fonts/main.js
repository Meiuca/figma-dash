const exceptionHandler = require("./src/exception-handler");
const config = require("./src/config-handler").handle();
const { depth } = require("./src/etc/functions");
const { validateFonts } = require("./src/etc/validations");
const downloadFonts = require("./src/linker/font-downloader");
const convertLink = require("./src/linker/link-converter");
const parseFonts = require("./src/linker/font-parser");

module.exports = async () => {
  try {
    validateFonts();

    let fonts = [];

    if (config.fonts.files) {
      let parsedFonts = parseFonts(config.fonts.files);

      let convertedLinks = await Promise.all(convertLink(parsedFonts));

      fonts = fonts.concat(convertedLinks);
    }

    if (config.fonts.urls) {
      let convertedLinks = await Promise.all(convertLink(config.fonts.urls));

      fonts = fonts.concat(convertedLinks);
    }

    if (config.fonts.directLinks) {
      fonts = fonts.concat(config.fonts.directLinks);
    }

    fonts = fonts.flat(depth(fonts));

    downloadFonts(fonts);
  } catch (err) {
    exceptionHandler(err, "check figma-dash.config.js");
  }
};
