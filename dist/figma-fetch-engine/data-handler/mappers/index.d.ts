import MeiucaEngineCore from "meiuca-engine-core";
import { TokenNameEntry, FigmaComponent, MapTokenValueReturn, Target } from "../../../../types";
export declare function reduceEntries(prev: TokenNameEntry, curr: TokenNameEntry): string;
export default function init(core: MeiucaEngineCore): {
    mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
    mapTokens: (tokenNames: string[][], mappedTokenValues: MapTokenValueReturn[]) => (prop: string[], index: number) => Target;
};
export interface Mappers {
    mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
    mapTokens: (tokenNames: string[][], mappedTokenValues: MapTokenValueReturn[]) => (prop: string[], index: number) => Target;
}
