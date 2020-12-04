const {
  depth,
  cleanStr,
  tokenValueRegexTest,
  parentContainerTokenRegexTest,
  tokenNameRegexTest,
  parseDeepObj,
} = require("figma-dash-core/functions");
const lodash = require("lodash");
const { mapTokenValues, mapTokens } = require("./mappers");
const chalk = require("chalk");

const outArray = [];

exports.parseComponentProps = (component) => {
  if (!component.children || !Array.isArray(component.children)) return;

  let tokenNames = [];

  let hasPropName = component.children.some((child) =>
    tokenNameRegexTest(child.name)
  );

  if (hasPropName) {
    tokenNames = component.children
      .filter((child) => tokenNameRegexTest(child.name))
      .map((child) =>
        child.name.split("-").map((item) => cleanStr(item).replace(/-/g, ""))
      );
  } else return;

  let filteredTokenValues = component.children.filter(
    (child) =>
      tokenValueRegexTest(child.name) ||
      (parentContainerTokenRegexTest(child.name) &&
        parseDeepObj(child).some(tokenValueRegexTest))
  );

  if (filteredTokenValues.length > 0) {
    let mappedTokenValues = filteredTokenValues.map(mapTokenValues);

    let out = tokenNames.map(mapTokens(tokenNames, mappedTokenValues));

    out = out
      .flat(depth(out))
      .reduce((prev, curr) => lodash.merge(prev, curr), {});

    outArray.push(out);
  } else {
    console.log(
      chalk.yellowBright("\nwarn"),
      `Ignoring ${tokenNames
        .map((name) => name.join("-"))
        .join()} because it's values doesn't follow the specified rules`
    );
  }
};

exports.getOutArray = () => outArray;
