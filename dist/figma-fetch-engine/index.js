"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
const prettier_1 = __importDefault(require("prettier"));
const data_handler_1 = __importDefault(require("./data-handler"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const target_subdivider_1 = __importDefault(require("./target-subdivider"));
const figma_dash_core_1 = __importDefault(require("figma-dash-core"));
async function default_1(args = {}) {
    let figmaUrl = "";
    const { core: { config: { figma }, validations: { validateFigmaConfig }, }, } = this;
    try {
        validateFigmaConfig();
        console.log("\n", chalk_1.default.greenBright("info"), "Importing from ID", chalk_1.default.gray(figma.fileID), "with access token", chalk_1.default.gray(figma.accessToken), "to", chalk_1.default.gray(path_1.default.resolve(figma.output)));
        figmaUrl = "https://api.figma.com/v1/files/" + figma.fileID;
        let { data } = await axios_1.default.get(figmaUrl, {
            method: "GET",
            headers: {
                "X-Figma-Token": figma.accessToken,
            },
        });
        if (!fs_1.existsSync(figma.output))
            fs_1.mkdirSync(figma.output, { recursive: true });
        let outputPath = path_1.default.resolve(figma.output, "./tokens.json");
        let target = lodash_1.default.merge({}, ...data_handler_1.default(data.document, this.core));
        fs_1.writeFileSync(outputPath, prettier_1.default.format(JSON.stringify(target), {
            parser: "json",
        }));
        let output = [{ src: outputPath, filename: "tokens" }];
        if (args.separatedTokens)
            target_subdivider_1.default(target, output, this.core);
        fs_1.writeFileSync(path_1.default.resolve(figma.output, "./meta.json"), prettier_1.default.format(JSON.stringify(output), {
            parser: "json",
        }));
    }
    catch (err) {
        throw new figma_dash_core_1.default.FigmaDashError(err, `error thrown when fetching ${figmaUrl}`);
    }
    console.log("\n", chalk_1.default.greenBright("info"), "Tokens successfully imported");
    if (args.convert)
        this.convertTokens(args);
}
exports.default = default_1;
