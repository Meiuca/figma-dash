"use strict";

const MeiucaEngine = require("./dist").default;

const init = async (args = {}) => {
  return await MeiucaEngine.init(args);
};

const importFromFigma = async (args = {}) => {
  await new MeiucaEngine().importFromFigma(args);
};

const convertTokens = (args = {}) => {
  new MeiucaEngine().convertTokens(args);
};

const linkFonts = async () => {
  await require("meiuca-engine-fonts").default();
};

const doAll = async (args = {}) => {
  let fd = await init(args);

  await fd.importFromFigma({ ...args, convert: true });

  if (args.link) await require("meiuca-engine-fonts").default(fd.core);
};

module.exports = {
  init,
  importFromFigma,
  linkFonts,
  doAll,
  convertTokens,
};
