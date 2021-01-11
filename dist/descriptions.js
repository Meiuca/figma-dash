"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSeparatedTokens = exports.all = exports.postImport = exports.imports = exports.module = exports.force = exports.init = exports.link = exports.convert = exports.path = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.path = "The path where the config file will be placed. If ommited the system will resolve to the cwd";
exports.convert = "Convert style tokens";
exports.link = "Download and link fonts";
exports.init = "Generate sample " + chalk_1.default.greenBright("figma-dash.config.js");
exports.force = "Can be used to reset the configuration";
exports.module = "Handle a specific module";
exports.imports = "Generate tokens from Figma";
exports.postImport = "Convert tokens after import";
exports.all = "Execute all commands";
exports.noSeparatedTokens = "If this flag is set the api will not generate separated files for each category and item";
