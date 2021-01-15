"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceEntries = void 0;
const mapped_token_values_handler_1 = require("./mapped-token-values-handler");
const attributes_transformer_1 = __importDefault(require("./attributes-transformer"));
function reduceEntries(prev, curr) {
    prev = typeof prev == "object" ? Object.values(prev)[0].value : prev;
    curr = typeof curr == "object" ? Object.values(curr)[0].value : curr;
    return prev + (prev == "" ? "" : " ") + curr;
}
exports.reduceEntries = reduceEntries;
function mapTokenValues(child) {
    if (this.parentContainerTokenRegexTest(child.name) && child.children) {
        return child.children
            .filter(({ name }) => this.childContainerTokenRegexTest(name))
            .map((nestedChild) => {
            {
                let tokenValue = this.childContainerTokenRegexExec(nestedChild.name);
                return [
                    tokenValue[1].toLowerCase(),
                    this.cleanTokenValue(tokenValue[2]),
                ];
            }
        });
    }
    else {
        let cleanStr = this.cleanTokenValue(child.name);
        return Object.assign(cleanStr, { chars: child.characters || "" });
    }
}
function mapTokens(tokenNames, mappedTokenValues) {
    let attr = attributes_transformer_1.default(this.config.globals.tokenNameModel, tokenNames.flat(this.depth(tokenNames)));
    return (prop, index) => {
        let objToBeReduced = this.handleMappedTokenValues(mappedTokenValues, index, attr);
        return prop.reverse().reduce((prev, curr) => ({ [curr]: prev }), objToBeReduced);
    };
}
function init(core) {
    return {
        mapTokenValues: mapTokenValues.bind(core.functions),
        mapTokens: mapTokens.bind({
            ...core,
            ...core.functions,
            handleMappedTokenValues: mapped_token_values_handler_1.handleMappedTokenValues,
        }),
    };
}
exports.default = init;
