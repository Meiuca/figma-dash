import {
  depth,
  cleanTokenValue,
  tokenValueRegexTest,
  parentContainerTokenRegexTest,
  childContainerTokenRegexTest,
} from "figma-dash-core/functions";
import lodash from "lodash";
import { handleComponentValue } from "./component-value-handler";

import {
  TokenNameEntry,
  FigmaComponent,
  MapTokenValueReturn,
  StringTupleArray,
  Target,
  SignedString,
  TargetData,
} from "../../../types";

function reduceEntries(prev: TokenNameEntry, curr: TokenNameEntry) {
  prev = typeof prev == "object" ? Object.values(prev)[0]!.value : prev;

  curr = typeof curr == "object" ? Object.values(curr)[0]!.value : curr;

  return prev + (prev == "" ? "" : " ") + curr;
}

export function mapTokenValues(child: FigmaComponent): MapTokenValueReturn {
  if (parentContainerTokenRegexTest(child.name) && child.children) {
    return child.children
      .filter(({ name }) => childContainerTokenRegexTest(name))
      .map((nestedChild) => {
        {
          let tokenName = nestedChild.children?.find(
            (tokenValue) => !tokenValueRegexTest(tokenValue.name)
          );

          let token = nestedChild.children?.find((tokenValue) =>
            tokenValueRegexTest(tokenValue.name)
          );

          return [
            tokenName!.name.toLowerCase(),
            token ? cleanTokenValue(token.name) : "not found",
          ];
        }
      });
  } else {
    let cleanStr = cleanTokenValue(child.name);

    return Object.assign(cleanStr, { chars: child.characters });
  }
}

export function mapTokens(
  tokenNames: string[][],
  mappedTokenValues: MapTokenValueReturn[]
) {
  return (prop: string[], index: number) => {
    let objToBeReduced: TargetData;

    let attributes = {
      category: tokenNames.flat(depth(tokenNames))[0] as string,
      type: tokenNames.flat(depth(tokenNames))[1] as string,
    };

    if (depth(mappedTokenValues[index]) > 1) {
      let entriesFromTokenValues = (mappedTokenValues[
        index
      ] as StringTupleArray).map((value) => ({
        [value[0]]: { value: value[1], attributes },
      }));

      entriesFromTokenValues.push({
        stack: {
          value: entriesFromTokenValues.reduce(reduceEntries, "") as string,
          attributes,
        },
      });

      objToBeReduced = lodash.merge({}, ...entriesFromTokenValues);
    } else {
      objToBeReduced = {
        value: handleComponentValue(
          mappedTokenValues[index] as SignedString,
          attributes
        ),
        attributes,
      };
    }

    return (prop
      .reverse()
      .reduce(
        (prev, curr) => (({ [curr]: prev } as unknown) as TargetData),
        objToBeReduced
      ) as unknown) as Target;
  };
}
