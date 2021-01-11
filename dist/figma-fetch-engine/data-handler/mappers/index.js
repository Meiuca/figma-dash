"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reduceEntries = void 0;
const mapped_token_values_handler_1 = require("./mapped-token-values-handler");
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
        let attributes;
        switch (this.config.globals.tokenNameModel) {
            case "inverted":
                attributes = {
                    category: tokenNames.flat(this.depth(tokenNames))[0],
                    type: tokenNames.flat(this.depth(tokenNames))[1],
                };
                break;
            default:
                attributes = {
                    type: tokenNames.flat(this.depth(tokenNames))[0],
                    category: tokenNames.flat(this.depth(tokenNames))[1],
                };
                break;
        }
        let objToBeReduced = this.handleMappedTokenValues(mappedTokenValues, index, attributes);
        return prop
            .reverse()
            .reduce((prev, curr) => ({ [curr]: prev }), objToBeReduced);
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
