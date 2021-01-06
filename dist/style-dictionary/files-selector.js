"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
function default_1(config, filename, group) {
    if (group.includes("ios") || group.includes("flutter"))
        filename = lodash_1.default.upperFirst(lodash_1.default.camelCase(filename.replace(/-/g, " ")));
    if (group.includes("android"))
        filename = lodash_1.default.snakeCase(filename.replace(/-/g, " "));
    if (config.tokens.files) {
        return config.tokens.files.map((file) => ({
            ...config.tokens,
            ...file,
            destination: file.destination.replace(/\{f\}/g, filename),
            className: filename,
            mapName: filename,
        }));
    }
    else {
        return [
            {
                ...config.tokens,
                destination: filename + config.tokens.output.extension,
                format: config.tokens.output.format,
                className: filename,
                mapName: filename,
            },
        ];
    }
}
exports.default = default_1;
