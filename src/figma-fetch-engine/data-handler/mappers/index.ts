import MeiucaEngineCore from "meiuca-engine-core";
import { Functions } from "meiuca-engine-core/dist/functions";
import {
  TokenNameEntry,
  FigmaComponent,
  MapTokenValueReturn,
  Target,
} from "../../../../types";
import { handleMappedTokenValues } from "./mapped-token-values-handler";
import transformAttributes from "./attributes-transformer";

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
          let tokenValue = this.childContainerTokenRegexExec(nestedChild.name)!;

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
  this: MapTokensThisArg,
  tokenNames: string[][],
  mappedTokenValues: MapTokenValueReturn[]
) {
  let attr = transformAttributes(
    this.config.globals.tokenNameModel,
    tokenNames.flat(this.depth(tokenNames)) as string[]
  );

  return (prop: string[], index: number) => {
    let objToBeReduced = this.handleMappedTokenValues(
      mappedTokenValues,
      index,
      attr
    );

    return (prop.reverse().reduce(
      //@ts-ignore
      (prev, curr) => ({ [curr]: prev }),
      objToBeReduced
    ) as unknown) as Target;
  };
}

export default function init(core: MeiucaEngineCore): Mappers {
  return {
    mapTokenValues: mapTokenValues.bind(core.functions),
    mapTokens: mapTokens.bind({
      ...core,
      ...core.functions,
      handleMappedTokenValues,
    }),
  };
}

interface MapTokensThisArg extends MeiucaEngineCore, Functions {
  handleMappedTokenValues: typeof handleMappedTokenValues;
}

export interface Mappers {
  mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
  mapTokens: (
    tokenNames: string[][],
    mappedTokenValues: MapTokenValueReturn[]
  ) => (prop: string[], index: number) => Target;
}
