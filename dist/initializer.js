"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const figlet_1 = __importDefault(require("figlet"));
const inquirer_1 = require("inquirer");
const fs_1 = require("fs");
const index_1 = __importDefault(require("./index"));
async function default_1(args = {}) {
    let pathToSrc = path_1.default.resolve(__dirname, "../defaults/config.js");
    let pathToDest = path_1.default.resolve(args.path || "./", "./figma-dash.config.js");
    if (!fs_1.existsSync(pathToDest) || args.force) {
        console.log(chalk_1.default.bold.green(figlet_1.default.textSync("FIGMA DASH", "JS Block Letters")), `\n\n\t\t\tWelcome\n\n`, "Initialized with sample configuration");
        fs_1.copyFileSync(pathToSrc, pathToDest);
        await inquirer_1.prompt({
            name: "pause",
            message: "\n\nPlease take a look at your config file, change it according to your need, then come back here and hit enter",
        });
    }
    else {
        console.log("\n", chalk_1.default.greenBright("info"), "Figma Dash config file already exists.\n");
    }
    return new index_1.default();
}
exports.default = default_1;
