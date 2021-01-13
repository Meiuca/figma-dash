"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const style_dictionary_1 = __importDefault(require("./style-dictionary"));
const meiuca_engine_core_1 = require("meiuca-engine-core");
const excludedObjects = ["fonts", "figma", "patterns", "globals"];
function log(module, meta, core) {
    if (excludedObjects.includes(module))
        return;
    let moduleInfo = core.config[module];
    if (!moduleInfo)
        throw new meiuca_engine_core_1.MeiucaEngineError(`module ${module} does not exist`);
    console.log("\n", chalk_1.default.greenBright("info"), "Converting module:", module);
    style_dictionary_1.default(meta, module, moduleInfo, core);
}
function default_1(args = {}) {
    let meta = require(path_1.default.resolve(this.core.config.figma.output, "./meta.json"));
    if (args.module) {
        log(args.module, meta, this.core);
    }
    else {
        Object.keys(this.core.config).forEach((cf) => log(cf, meta, this.core));
    }
}
exports.default = default_1;
