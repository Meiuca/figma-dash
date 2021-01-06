import FigmaDashCore from "figma-dash-core";
import { FigmaComponent, Target } from "../../../types";
declare function getOutArray(): Target[];
export default function init(core: FigmaDashCore): {
    parseComponentProps: (component: FigmaComponent) => void;
    getOutArray: typeof getOutArray;
};
export interface ComponentPropsParser {
    parseComponentProps: (component: FigmaComponent) => void;
    getOutArray: () => Target[];
}
export {};
