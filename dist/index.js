"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meiuca_engine_core_1 = __importDefault(require("meiuca-engine-core"));
const initializer_1 = __importDefault(require("./initializer"));
const Descriptions = __importStar(require("./descriptions"));
const converter_1 = __importDefault(require("./converter"));
const figma_fetch_engine_1 = __importDefault(require("./figma-fetch-engine"));
class MeiucaEngine {
    constructor(config) {
        this.convertTokens = converter_1.default;
        this.descriptions = Descriptions;
        this.importFromFigma = figma_fetch_engine_1.default;
        this.core = new meiuca_engine_core_1.default(config);
    }
}
exports.default = MeiucaEngine;
MeiucaEngine.init = initializer_1.default;
