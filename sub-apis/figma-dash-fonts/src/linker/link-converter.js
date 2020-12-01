const css = require("css");
const exceptionHandler = require("../exception-handler");
const axios = require("axios").default;

function cssMapper(rule) {
  let font = [];

  rule.declarations
    .filter((item) => item.property == "src")
    .forEach((declaration) => {
      let urlRegExp = /url\(([^)]+)/;

      let src = urlRegExp.exec(declaration.value)[1];

      let srcWithoutQuote = src.replace(/'/g, "");

      font.push(srcWithoutQuote);
    });

  rule.declarations
    .filter((item) => item.property == "font-family")
    .forEach((declaration) => {
      let fontFamily = declaration.value.replace(/\s/g, "-");

      let fontFamilyWithoutQuote = fontFamily.replace(/'/g, "");

      let fontWeight = rule.declarations.filter(
        (item) => item.property == "font-weight"
      )[0].value;

      let italic = rule.declarations.filter(
        (item) => item.property == "font-style"
      )[0].value;

      font.push(fontFamilyWithoutQuote + fontWeight + italic);
    });

  return {
    src: font[0],
    local: font[1] + "." + /[^.]+$/.exec(font[0])[0],
  };
}

module.exports = (urls) => {
  return urls.map(async (url) => {
    try {
      let { data } = await axios.get(url);

      let cssObj = css.parse(data);

      return cssObj.stylesheet.rules.map(cssMapper);
    } catch (err) {
      exceptionHandler(err, `error thrown when fetching ${url}`);
    }
  });
};
