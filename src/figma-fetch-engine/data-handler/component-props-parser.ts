import FigmaDashCore from "figma-dash-core";
import { Functions } from "figma-dash-core/dist/functions";
import lodash from "lodash";
import InitMappers, { Mappers } from "./mappers";
import chalk from "chalk";

import { FigmaComponent, Target } from "../../../types";

const outArray: Target[] = [];

function parseComponentProps(
  this: Mappers & Functions,
  component: FigmaComponent
) {
  if (!component.children || !Array.isArray(component.children)) return;

  let tokenNames: string[][] = [];

  let hasPropName = component.children.some((child) =>
    this.tokenNameRegexTest(child.name)
  );

  if (hasPropName) {
    tokenNames = component.children
      .filter((child) => this.tokenNameRegexTest(child.name))
      .map((child) =>
        child.name
          .split("-")
          .map((item) => this.cleanStr(item).replace(/-/g, ""))
      );
  } else return;

  let filteredTokenValues = component.children.filter(
    (child) =>
      this.tokenValueRegexTest(child.name) ||
      (this.parentContainerTokenRegexTest(child.name) &&
        this.parseDeepObj(child).some(this.tokenValueRegexTest))
  );

  if (filteredTokenValues.length > 0) {
    let mappedTokenValues = filteredTokenValues.map(this.mapTokenValues);

    let out = tokenNames.map(this.mapTokens(tokenNames, mappedTokenValues));

    let toPush = out
      .flat(this.depth(out))
      .reduce((prev, curr) => lodash.merge(prev, curr), {});

    outArray.push(toPush);
  } else {
    console.warn(
      chalk.yellowBright("\nwarn"),
      "Ignoring",
      tokenNames.map((name) => name.join("-")).join(),
      "because it's values doesn't follow the specified rules"
    );
  }
}

function getOutArray() {
  return outArray;
}

export default function init(core: FigmaDashCore) {
  return {
    parseComponentProps: parseComponentProps.bind({
      ...core.functions,
      ...InitMappers(core),
    }),
    getOutArray,
  };
}

export interface ComponentPropsParser {
  parseComponentProps: (component: FigmaComponent) => void;
  getOutArray: () => Target[];
}
