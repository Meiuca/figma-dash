"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const component_value_handler_1 = __importDefault(require("./component-value-handler"));
function reduceEntries(prev, curr) {
    prev = typeof prev == "object" ? Object.values(prev)[0].value : prev;
    curr = typeof curr == "object" ? Object.values(curr)[0].value : curr;
    return prev + (prev == "" ? "" : " ") + curr;
}
function mapTokenValues(child) {
    if (this.parentContainerTokenRegexTest(child.name) && child.children) {
        return child.children
            .filter(({ name }) => this.childContainerTokenRegexTest(name))
            .map((nestedChild) => {
            {
                let tokenName = nestedChild.children?.find((tokenValue) => !this.tokenValueRegexTest(tokenValue.name));
                let token = nestedChild.children?.find((tokenValue) => this.tokenValueRegexTest(tokenValue.name));
                return [
                    tokenName.name.toLowerCase(),
                    token ? this.cleanTokenValue(token.name) : "not found",
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
    return (prop, index) => {
        let objToBeReduced;
        let attributes = {
            category: tokenNames.flat(this.depth(tokenNames))[0],
            type: tokenNames.flat(this.depth(tokenNames))[1],
        };
        if (this.depth(mappedTokenValues[index]) > 1) {
            let entriesFromTokenValues = mappedTokenValues[index].map((value) => ({
                [value[0]]: { value: value[1], attributes },
            }));
            entriesFromTokenValues.push({
                stack: {
                    value: entriesFromTokenValues.reduce(reduceEntries, ""),
                    attributes,
                },
            });
            objToBeReduced = lodash_1.default.merge({}, ...entriesFromTokenValues);
        }
        else {
            objToBeReduced = {
                value: component_value_handler_1.default(mappedTokenValues[index], attributes, this),
                attributes,
            };
        }
        return prop
            .reverse()
            .reduce((prev, curr) => ({ [curr]: prev }), objToBeReduced);
    };
}
function init(core) {
    return {
        mapTokenValues: mapTokenValues.bind(core.functions),
        mapTokens: mapTokens.bind({ ...core, ...core.functions }),
    };
}
exports.default = init;
