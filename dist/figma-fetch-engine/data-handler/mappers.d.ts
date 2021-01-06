import FigmaDashCore from "figma-dash-core";
import { FigmaComponent, MapTokenValueReturn, Target } from "../../../types";
export default function init(core: FigmaDashCore): {
    mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
    mapTokens: (tokenNames: string[][], mappedTokenValues: MapTokenValueReturn[]) => (prop: string[], index: number) => Target;
};
export interface Mappers {
    mapTokenValues: (child: FigmaComponent) => MapTokenValueReturn;
    mapTokens: (tokenNames: string[][], mappedTokenValues: MapTokenValueReturn[]) => (prop: string[], index: number) => Target;
}
