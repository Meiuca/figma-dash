import Core from "figma-dash-core";
import Initializer from "./initializer";
import * as Descriptions from "./descriptions";
import Converter from "./converter";
import FigmaFetchEngine from "./figma-fetch-engine";

import {
  FigmaDashConfig,
  FigmaDashModules,
} from "figma-dash-core/dist/config-handler";

export default class FigmaDash {
  core: Core;
  convertTokens = Converter;
  descriptions = Descriptions;
  importFromFigma = FigmaFetchEngine;

  static init = Initializer;

  constructor(config?: FigmaDashConfig & FigmaDashModules) {
    this.core = new Core(config);
  }
}
