"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMappedTokenValues = void 0;
const lodash_1 = __importDefault(require("lodash"));
const component_value_handler_1 = __importDefault(require("./component-value-handler"));
const index_1 = require("./index");
function handleMappedTokenValues(mappedTokenValues, index, attributes) {
    const isStringTupleArray = (item) => {
        return this.depth(item) > 0;
    };
    let mappedTokenValue = mappedTokenValues[index];
    if (isStringTupleArray(mappedTokenValue)) {
        let entriesFromTokenValues = mappedTokenValue.map((value) => ({
            [value[0]]: { value: value[1], attributes },
        }));
        entriesFromTokenValues.push({
            stack: {
                value: entriesFromTokenValues.reduce(index_1.reduceEntries, ""),
                attributes,
            },
        });
        return lodash_1.default.merge({}, ...entriesFromTokenValues);
    }
    else {
        return {
            value: component_value_handler_1.default(mappedTokenValue, attributes, this),
            attributes,
        };
    }
}
exports.handleMappedTokenValues = handleMappedTokenValues;
