exports.init = (args = {}) => {
  require("./dist/initializer").default(args);
};

exports.importFromFigma = async (args = {}) => {
  await require("./dist/figma-fetch-engine").default(args);

  if (args.convert) {
    exports.convertTokens(args);
  }
};

exports.convertTokens = (args = {}) => {
  require("./dist/converter").default(args);
};

exports.linkFonts = async () => {
  await require("figma-dash-fonts")();
};

exports.doAll = async (args = {}) => {
  exports.init(args);

  await exports.importFromFigma({ ...args, convert: true });

  if (args.link) await exports.linkFonts();
};
