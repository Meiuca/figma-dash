import MeiucaEngineCore from "meiuca-engine-core";
import { FigmaComponent, Target } from "../../../types";
declare function getOutArray(): Target[];
export default function init(core: MeiucaEngineCore): {
    parseComponentProps: (component: FigmaComponent) => void;
    getOutArray: typeof getOutArray;
};
export interface ComponentPropsParser {
    parseComponentProps: (component: FigmaComponent) => void;
    getOutArray: () => Target[];
}
export {};
