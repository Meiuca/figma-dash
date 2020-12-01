const path = require("path");
const exceptionHandler = require("../exception-handler");
const { parseDeepObj } = require("../etc/functions");
const config = require("../config-handler").handle();

module.exports = (srcArray) => {
  try {
    return srcArray
      .map((src) => {
        let fonts = parseDeepObj(require(path.resolve(src)));

        let _return = {
          family: [],
          weight: [],
        };

        fonts.forEach((item) => {
          if (/^[A-Z][A-Za-z]+/.test(item)) {
            _return.family.push(item.replace(/\s/g, "+"));
          }

          if (/^[0-9]{3}$/.test(item)) {
            _return.weight.push(item);
          }
        });

        return _return.family.map((fItem) => {
          return _return.weight.map((wItem) =>
            config.fonts.provider
              .replace(/\{f\}/g, fItem)
              .replace(/\{w\}/g, wItem)
          );
        });
      })
      .flat(2);
  } catch (err) {
    exceptionHandler(err, "try 'init -f' to update the config file");
  }
};
