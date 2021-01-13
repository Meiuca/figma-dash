import Core from "meiuca-engine-core";
import Initializer from "./initializer";
import * as Descriptions from "./descriptions";
import Converter from "./converter";
import FigmaFetchEngine from "./figma-fetch-engine";
import { MeiucaEngineConfig, MeiucaEngineModules } from "meiuca-engine-core/dist/config-handler";
export default class MeiucaEngine {
    core: Core;
    convertTokens: typeof Converter;
    descriptions: typeof Descriptions;
    importFromFigma: typeof FigmaFetchEngine;
    static init: typeof Initializer;
    constructor(config?: MeiucaEngineConfig & MeiucaEngineModules);
}
