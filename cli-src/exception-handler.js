const chalk = require("chalk");
const { tab } = require("./etc/functions");

module.exports = (error, help) => {
  error.stack =
    (error.stack || "undefined").replace(/\n/g, "\n" + tab(1)) +
    (help ? `${chalk.yellowBright("\n\n help")} ${help}\n` : "");

  throw error;
};
