import FigmaDashCore from "figma-dash-core";
import { Functions } from "figma-dash-core/dist/functions";
import {
  TokenNameEntry,
  FigmaComponent,
  MapTokenValueReturn,
  Target,
  TargetData,
  StyleAttributes,
} from "../../../../types";
import { handleMappedTokenValues } from "./mapped-token-values-handler";

export function reduceEntries(prev: TokenNameEntry, curr: TokenNameEntry) {
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
  this: FigmaDashCore &
    Functions & { handleMappedTokenValues: typeof handleMappedTokenValues },
  tokenNames: string[][],
  mappedTokenValues: MapTokenValueReturn[]
) {
  return (prop: string[], index: number) => {
    let attributes: StyleAttributes;

    switch (this.config.globals.tokenNameModel) {
      case "inverted":
        attributes = {
          category: tokenNames.flat(this.depth(tokenNames))[0] as string,
          type: tokenNames.flat(this.depth(tokenNames))[1] as string,
        };
        break;

      /* also classic */
      default:
        attributes = {
          type: tokenNames.flat(this.depth(tokenNames))[0] as string,
          category: tokenNames.flat(this.depth(tokenNames))[1] as string,
        };
        break;
    }

    let objToBeReduced = this.handleMappedTokenValues(
      mappedTokenValues,
      index,
      attributes
    );

    return (prop
      .reverse()
      .reduce(
        (prev, curr) => (({ [curr]: prev } as unknown) as TargetData),
        objToBeReduced
      ) as unknown) as Target;
  };
}

export default function init(core: FigmaDashCore): Mappers {
  return {
    mapTokenValues: mapTokenValues.bind(core.functions),
    mapTokens: mapTokens.bind({
      ...core,
      ...core.functions,
      handleMappedTokenValues,
    }),
  };
}

export interface Mappers {
  mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
  mapTokens: (
    tokenNames: string[][],
    mappedTokenValues: MapTokenValueReturn[]
  ) => (prop: string[], index: number) => Target;
}
