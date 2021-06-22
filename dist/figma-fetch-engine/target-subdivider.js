"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = __importDefault(require("lodash"));
const prettier_1 = __importDefault(require("prettier"));
const path_1 = __importDefault(require("path"));
function subdivide(item, parentOut, output) {
    Object.entries(item[1]).forEach((subItem) => {
        if (subItem[0] == "level" ||
            (Object.keys(subItem[1]).length < 2 && Object.keys(item[1]).length < 2))
            return;
        let outPath = path_1.default.resolve(parentOut, `./${subItem[0]}.json`);
        fs_1.writeFileSync(outPath, prettier_1.default.format(JSON.stringify({ [item[0]]: { [subItem[0]]: subItem[1] } }), {
            parser: "json",
        }));
        output.push({ src: outPath, filename: `${item[0]}-${subItem[0]}` });
    });
}
function default_1(target, output, core) {
    const { config: { figma }, functions: { cleanStr }, } = core;
    Object.entries(target).forEach((item) => {
        let clearOutFolderPath = cleanStr(item[0]);
        let parentOut = path_1.default.resolve(figma.output, `./${clearOutFolderPath}`);
        if (!fs_1.existsSync(parentOut))
            fs_1.mkdirSync(parentOut, { recursive: true });
        subdivide(item, parentOut, output);
        let out = path_1.default.resolve(parentOut, "./index.json");
        let outContent = { [item[0]]: item[1] };
        if (fs_1.existsSync(out)) {
            let contentToBeMerged = require(path_1.default.resolve(out));
            outContent = lodash_1.default.merge(outContent, contentToBeMerged);
        }
        fs_1.writeFileSync(out, prettier_1.default.format(JSON.stringify(outContent), {
            parser: "json",
        }));
        let metaToBePushed = {
            src: out,
            filename: clearOutFolderPath,
        };
        if (!output.some(({ filename }) => filename == metaToBePushed.filename))
            output.push(metaToBePushed);
    });
}
exports.default = default_1;
