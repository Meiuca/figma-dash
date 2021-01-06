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
const style_dictionary_1 = __importDefault(require("style-dictionary"));
const cssFormatBlock = __importStar(require("./component-format-block/css"));
const scssFormatBlock = __importStar(require("./component-format-block/scss"));
const react_native_transformer_1 = __importDefault(require("./react-native-transformer"));
function createRegisters(core) {
    style_dictionary_1.default.registerTransform({
        name: "size/object",
        type: "value",
        matcher: (prop) => prop.attributes.category === "size",
        transformer: react_native_transformer_1.default,
    });
    style_dictionary_1.default.registerTransformGroup({
        name: "native",
        transforms: ["name/cti/camel", "size/object", "color/css"],
    });
    style_dictionary_1.default.registerTransformGroup({
        name: "default",
        transforms: ["name/cti/kebab"],
    });
    style_dictionary_1.default.registerFormat({
        ...cssFormatBlock,
        formatter: cssFormatBlock.formatter.bind(core),
    });
    style_dictionary_1.default.registerFormat({
        ...scssFormatBlock,
        formatter: scssFormatBlock.formatter.bind(core),
    });
    style_dictionary_1.default.registerFilter({
        name: "isNotComponent",
        matcher: function (prop) {
            return prop.attributes.category !== (core.config.ds || "component");
        },
    });
}
exports.default = createRegisters;
