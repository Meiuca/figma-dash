import { Functions } from "figma-dash-core";
import lodash from "lodash";
import { mapTokenValues, mapTokens } from "./mappers";
import chalk from "chalk";

import { FigmaComponent, Target } from "../../../types";

const {
  depth,
  cleanStr,
  tokenValueRegexTest,
  parentContainerTokenRegexTest,
  tokenNameRegexTest,
  parseDeepObj,
} = Functions;

const outArray: Target[] = [];

export function parseComponentProps(component: FigmaComponent) {
  if (!component.children || !Array.isArray(component.children)) return;

  let tokenNames: string[][] = [];

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

    let toPush = out
      .flat(depth(out))
      .reduce((prev, curr) => lodash.merge(prev, curr), {}) as Target;

    outArray.push(toPush);
  } else {
    console.warn(
      chalk.yellowBright("\nwarn"),
      `Ignoring ${tokenNames
        .map((name) => name.join("-"))
        .join()} because it's values doesn't follow the specified rules`
    );
  }
}

export function getOutArray() {
  return outArray;
}
