import FigmaDashCore from "figma-dash-core";
import { Functions } from "figma-dash-core/dist/functions";
import lodash from "lodash";
import handleComponentValue from "./component-value-handler";

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

function mapTokenValues(
  this: Functions,
  child: FigmaComponent
): MapTokenValueReturn {
  if (this.parentContainerTokenRegexTest(child.name) && child.children) {
    return child.children
      .filter(({ name }) => this.childContainerTokenRegexTest(name))
      .map((nestedChild) => {
        {
          let tokenName = nestedChild.children?.find(
            (tokenValue) => !this.tokenValueRegexTest(tokenValue.name)
          );

          let token = nestedChild.children?.find((tokenValue) =>
            this.tokenValueRegexTest(tokenValue.name)
          );

          return [
            tokenName!.name.toLowerCase(),
            token ? this.cleanTokenValue(token.name) : "not found",
          ];
        }
      });
  } else {
    let cleanStr = this.cleanTokenValue(child.name);

    return Object.assign(cleanStr, { chars: child.characters || "" });
  }
}

function mapTokens(
  this: FigmaDashCore & Functions,
  tokenNames: string[][],
  mappedTokenValues: MapTokenValueReturn[]
) {
  return (prop: string[], index: number) => {
    let objToBeReduced: TargetData;

    let attributes = {
      category: tokenNames.flat(this.depth(tokenNames))[0] as string,
      type: tokenNames.flat(this.depth(tokenNames))[1] as string,
    };

    if (this.depth(mappedTokenValues[index] as any[]) > 1) {
      let entriesFromTokenValues = (mappedTokenValues[
        index
      ] as StringTupleArray).map((value) => ({
        [value[0]]: { value: value[1], attributes },
      }));

      entriesFromTokenValues.push({
        stack: {
          value: entriesFromTokenValues.reduce(reduceEntries, ""),
          attributes,
        },
      });

      objToBeReduced = lodash.merge({}, ...entriesFromTokenValues);
    } else {
      objToBeReduced = {
        value: handleComponentValue(
          mappedTokenValues[index] as SignedString,
          attributes,
          this
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

export default function init(core: FigmaDashCore) {
  return {
    mapTokenValues: mapTokenValues.bind(core.functions),
    mapTokens: mapTokens.bind({ ...core, ...core.functions }),
  };
}

export interface Mappers {
  mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
  mapTokens: (
    tokenNames: string[][],
    mappedTokenValues: MapTokenValueReturn[]
  ) => (prop: string[], index: number) => Target;
}
