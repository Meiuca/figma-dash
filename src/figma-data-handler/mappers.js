const {
  depth,
  cleanTokenValue,
  tokenValueRegexTest,
  parentContainerTokenRegexTest,
  childContainerTokenRegexTest,
} = require("figma-dash-core/functions");
const lodash = require("lodash");

function reduceEntries(prev, curr) {
  prev = typeof prev == "object" ? Object.values(prev)[0].value : prev;

  curr = typeof curr == "object" ? Object.values(curr)[0].value : curr;

  return prev + (prev == "" ? "" : " ") + curr;
}

exports.mapTokenValues = (child) => {
  if (parentContainerTokenRegexTest(child.name)) {
    return child.children.map((nestedChild) => {
      if (childContainerTokenRegexTest(nestedChild.name)) {
        let tokenName = nestedChild.children.find(
          (tokenValue) => !tokenValueRegexTest(tokenValue.name)
        );

        let token = nestedChild.children.find((tokenValue) =>
          tokenValueRegexTest(tokenValue.name)
        );

        return [
          tokenName.name.toLowerCase(),
          token ? cleanTokenValue(token.characters) : "not found",
        ];
      }
    });
  } else {
    return cleanTokenValue(child.characters);
  }
};

exports.mapTokens = (tokenNames, mappedTokenValues) => {
  return (prop, index) => {
    let objToBeReduced = null;

    let attributes = {
      category: tokenNames.flat(depth(tokenNames))[0],
      type: tokenNames.flat(depth(tokenNames))[1],
    };

    if (depth(mappedTokenValues[index]) > 1) {
      let entriesFromTokenValues = mappedTokenValues[index].map((value) => ({
        [value[0]]: { value: value[1], attributes },
      }));

      let reducedEntries = entriesFromTokenValues.reduce(reduceEntries, "");

      objToBeReduced = lodash.merge(...entriesFromTokenValues, {
        stack: {
          value: reducedEntries,
          attributes,
        },
      });
    } else {
      objToBeReduced = {
        value: mappedTokenValues[index],
        attributes,
      };
    }

    return prop
      .reverse()
      .reduce((prev, curr) => ({ [curr]: prev }), objToBeReduced);
  };
};
