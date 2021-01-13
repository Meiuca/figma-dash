import FigmaDashCore from "figma-dash-core";
import { Functions } from "figma-dash-core/dist/functions";
import { Globals } from "figma-dash-core/dist/config-handler";
import {
  TokenNameEntry,
  FigmaComponent,
  MapTokenValueReturn,
  Target,
  StyleAttributes,
} from "../../../../types";
import { handleMappedTokenValues } from "./mapped-token-values-handler";

export function reduceEntries(prev: TokenNameEntry, curr: TokenNameEntry) {
  prev = typeof prev == "object" ? Object.values(prev)[0]!.value : prev;

  curr = typeof curr == "object" ? Object.values(curr)[0]!.value : curr;

  return prev + (prev == "" ? "" : " ") + curr;
}

function mapTokenValues(
  this: Functions & Globals,
  child: FigmaComponent
): MapTokenValueReturn {
  if (this.parentContainerTokenRegexTest(child.name) && child.children) {
    return child.children
      .filter(({ name }) => this.childContainerTokenRegexTest(name))
      .map((nestedChild) => {
        {
          let tokenValue = this.patterns.childContainerTokenIdentifier.exec(
            nestedChild.name
          )!;

          return [
            tokenValue[1]!.toLowerCase(),
            this.cleanTokenValue(tokenValue[2]!),
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

    return (prop.reverse().reduce(
      //@ts-ignore
      (prev, curr) => ({ [curr]: prev }),
      objToBeReduced
    ) as unknown) as Target;
  };
}

export default function init(core: FigmaDashCore) {
  return {
    mapTokenValues: mapTokenValues.bind({
      ...core.functions,
      ...core.config.globals,
    }),
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
