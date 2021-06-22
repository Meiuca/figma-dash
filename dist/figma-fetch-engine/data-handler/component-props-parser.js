"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const mappers_1 = __importDefault(require("./mappers"));
const chalk_1 = __importDefault(require("chalk"));
const outArray = [];
function parseComponentProps(component) {
    if (!component.children || !Array.isArray(component.children))
        return;
    let tokenNames = [];
    let hasPropName = component.children.some((child) => this.tokenNameRegexTest(child.name));
    if (hasPropName) {
        tokenNames = component.children
            .filter((child) => this.tokenNameRegexTest(child.name))
            .map((child) => child.name
            .split("-")
            .map((item) => this.cleanStr(item).replace(/-/g, "")));
    }
    else
        return;
    let filteredTokenValues = component.children.filter((child) => this.tokenValueRegexTest(child.name) ||
        (this.parentContainerTokenRegexTest(child.name) &&
            this.parseDeepObj(child).some(this.tokenValueRegexTest)));
    if (filteredTokenValues.length > 0) {
        let mappedTokenValues = filteredTokenValues.map(this.mapTokenValues);
        let out = tokenNames.map(this.mapTokens(tokenNames, mappedTokenValues));
        let toPush = out
            .flat(this.depth(out))
            .reduce((prev, curr) => lodash_1.default.merge(prev, curr), {});
        outArray.push(toPush);
    }
    else {
        console.warn(chalk_1.default.yellowBright("\nwarn"), "Ignoring", tokenNames.map((name) => name.join("-")).join(), "because it's values doesn't follow the specified rules");
    }
}
function getOutArray() {
    return outArray;
}
function init(core) {
    return {
        parseComponentProps: parseComponentProps.bind({
            ...core.functions,
            ...mappers_1.default(core),
        }),
        getOutArray,
    };
}
exports.default = init;
