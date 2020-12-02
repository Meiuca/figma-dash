exports.init = (args = {}) => {
  require("./src/initializer")(args);
};

exports.importFromFigma = async (args = {}) => {
  await require("./src/figma-fetch-engine")();

  if (args.convert) {
    exports.convertTokens(args);
  }
};

exports.convertTokens = (args = {}) => {
  require("./src/converter")(args);
};

exports.linkFonts = () => {
  require("figma-dash-fonts")();
};

exports.doAll = async (args = {}) => {
  exports.init(args);

  await exports.importFromFigma({ ...args, convert: true });

  if (args.link) exports.linkFonts();
};
