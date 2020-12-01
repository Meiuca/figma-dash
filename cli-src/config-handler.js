const exceptionHandler = require("./exception-handler");
const path = require("path");

exports.path = path.resolve(process.cwd(), "./figma-dash.config.js");

exports.handle = () => {
  try {
    return require(exports.path);
  } catch (err) {
    exceptionHandler(err, "Try using 'init' first");
  }
};
