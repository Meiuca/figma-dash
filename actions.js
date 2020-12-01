exports.init = (args = {}) => {
  require("./cli-src/initializer")(args);
};

exports.importFromFigma = async (args = {}) => {
  await require("./cli-src/figma-fetch-engine")();

  if (args.convert) {
    exports.convertTokens(args);
  }
};

exports.convertTokens = (args = {}) => {
  require("./cli-src/converter")(args);
};

exports.linkFonts = () => {
  require("figma-dash-fonts")();
};

exports.doAll = async (args = {}) => {
  exports.init(args);

  await exports.importFromFigma();

  exports.convertTokens(args);

  if (args.link) exports.linkFonts();
};
