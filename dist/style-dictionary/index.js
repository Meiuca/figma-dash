"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const style_dictionary_1 = __importDefault(require("style-dictionary"));
const figma_dash_core_1 = require("figma-dash-core");
const files_selector_1 = __importDefault(require("./files-selector"));
const lodash_1 = __importDefault(require("lodash"));
const create_registers_1 = __importDefault(require("./create-registers"));
function runStyleDictionary(meta, module, moduleConfig, core) {
    create_registers_1.default(style_dictionary_1.default, core);
    let filterFn = (file) => file.include;
    try {
        meta.forEach(({ src, filename }) => {
            let SDClone = lodash_1.default.cloneDeep(style_dictionary_1.default);
            let files = files_selector_1.default(moduleConfig, filename, module);
            files.forEach((file) => {
                let mappedInclude = [file].filter(filterFn).map(filterFn);
                if (src.includes(core.config.globals.ds || "undefined") &&
                    mappedInclude.length == 0) {
                    return;
                }
                SDClone.extend({
                    source: [src],
                    include: mappedInclude,
                    platforms: {
                        [module]: {
                            transformGroup: module,
                            buildPath: moduleConfig.tokens.output.dir,
                            files: [file],
                        },
                    },
                }).buildPlatform(module);
            });
        });
    }
    catch (err) {
        throw new figma_dash_core_1.FigmaDashError(err, `Exception thrown while handling module: ${module}`);
    }
}
exports.default = runStyleDictionary;
