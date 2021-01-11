import FigmaDashCore from "figma-dash-core";
import { Functions } from "figma-dash-core/dist/functions";
import lodash from "lodash";
import handleComponentValue from "./component-value-handler";
import {
  MapTokenValueReturn,
  StringTupleArray,
  StyleAttributes,
  TargetData,
} from "../../../../types";
import { reduceEntries } from "./index";

export function handleMappedTokenValues(
  this: FigmaDashCore & Functions,
  mappedTokenValues: MapTokenValueReturn[],
  index: number,
  attributes: StyleAttributes
): TargetData {
  const isStringTupleArray = (item: any): item is StringTupleArray => {
    return this.depth(item) > 0;
  };

  let mappedTokenValue = mappedTokenValues[index]!;

  if (isStringTupleArray(mappedTokenValue)) {
    let entriesFromTokenValues = mappedTokenValue.map((value) => ({
      [value[0]]: { value: value[1], attributes },
    }));

    entriesFromTokenValues.push({
      stack: {
        value: entriesFromTokenValues.reduce(reduceEntries, ""),
        attributes,
      },
    });

    return lodash.merge({}, ...entriesFromTokenValues);
  } else {
    return {
      value: handleComponentValue(mappedTokenValue, attributes, this),
      attributes,
    };
  }
}
