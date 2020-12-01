exports.tab = (count) => "\t".repeat(count);

exports.depth = (array) =>
  Array.isArray(array) ? 1 + Math.max(...array.map(module.exports.depth)) : 0;

exports.cleanStr = (str) =>
  (str.length > 75 ? str.slice(0, 75) : str)
    .replace(/\W/g, "-")
    .replace(/^[-]+|[-]+$|[-]{2,}/g, "")
    .toLowerCase();

exports.cleanTokenValue = (str) =>
  str.replace(/[^A-Za-z0-9.%#\s]/g, "").replace(/^\s+|\s+$/g, "");

exports.parseDeepObj = (obj) => {
  let mappedObj = Object.values(obj).map((item) =>
    typeof item == "object" ? exports.parseDeepObj(item) : item
  );

  return mappedObj.flat(exports.depth(mappedObj));
};

/**
 * @param {{fontFamily: string; fontWeight: string; italic: boolean;}} fontSet
 */
exports.fontNameRender = (fontSet) => {
  let fontWeights = {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "UltraBold",
  };

  return `${fontSet.fontFamily.replace(/\s/g, "-")}-${
    fontWeights[fontSet.fontWeight]
  }${fontSet.italic ? "-Italic" : ""}`;
};

exports.tokenValueRegexTest = (key) => {
  let patterns = require("../config-handler").handle().patterns || {};

  return (
    patterns.tokenValueIdentifier || /^#|^~|\d+(?=px|rem|em|%|\.\d+)/
  ).test(key);
};

exports.parentContainerTokenRegexTest = (key) => {
  let patterns = require("../config-handler").handle().patterns || {};

  return (patterns.parentContainerTokenIdentifier || /:{2}/).test(key);
};

exports.tokenNameRegexTest = (key) => {
  let patterns = require("../config-handler").handle().patterns || {};

  return (patterns.tokenNameIdentifier || /^\$/).test(key);
};

exports.childContainerTokenRegexTest = (key) => {
  let patterns = require("../config-handler").handle().patterns || {};

  return (patterns.childContainerTokenIdentifier || /:{1}/).test(key);
};
