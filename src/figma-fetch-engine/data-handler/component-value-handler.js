const config = require("figma-dash-core/config-handler").handle();

exports.handleComponentValue = (mappedTokenValue, attributes) => {
  if (!mappedTokenValue.chars || attributes.category !== config.ds)
    return mappedTokenValue;

  let componentPropsRegExp = /(.+):(.+)(;|\s|$)/;

  let componentProps = [];

  while (componentPropsRegExp.test(mappedTokenValue.chars)) {
    let mappedChars = componentPropsRegExp.exec(mappedTokenValue.chars);

    if (!mappedChars) break;

    mappedTokenValue.chars = mappedTokenValue.chars.replace(mappedChars[0], "");

    componentProps.push({
      name: mappedChars[1],
      item:
        "{" +
        mappedChars[2].replace(/[^A-Za-z0-9\-_]/g, "").replace(/-/g, ".") +
        "}",
    });
  }

  return componentProps.length > 0 ? componentProps : mappedTokenValue;
};
