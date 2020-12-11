const config = require("figma-dash-core/config-handler").handle();
const { tokenNameRegexTest } = require("figma-dash-core/functions");

exports.handleComponentValue = (mappedTokenValue, attributes) => {
  if (!mappedTokenValue.chars || attributes.category !== config.ds)
    return mappedTokenValue;

  let componentPropsRegExp = /(.+):(.+)(;|\s|$)/;

  let componentProps = [];

  while (componentPropsRegExp.test(mappedTokenValue.chars)) {
    let mappedChars = componentPropsRegExp.exec(mappedTokenValue.chars);

    if (!mappedChars) break;

    mappedTokenValue.chars = mappedTokenValue.chars.replace(mappedChars[0], "");

    mappedChars[2] = mappedChars[2].replace(/^\s*/g, "");

    let parsedItem = tokenNameRegexTest(mappedChars[2])
      ? "{" +
        mappedChars[2].replace(/[^A-Za-z0-9\-_\s]/g, "").replace(/-/g, ".") +
        "}"
      : mappedChars[2];

    componentProps.push({
      name: mappedChars[1],
      item: parsedItem,
    });
  }

  return componentProps.length > 0 ? componentProps : mappedTokenValue;
};
