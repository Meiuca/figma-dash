"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const component_props_parser_1 = __importDefault(require("./component-props-parser"));
function handleChildren(component, core) {
    let { getOutArray, parseComponentProps } = component_props_parser_1.default(core);
    function handleRecursively(cp) {
        if (cp.children) {
            cp.children.forEach((child) => {
                if (child.children) {
                    parseComponentProps(child);
                    handleRecursively(child);
                }
                else {
                    parseComponentProps(cp);
                }
            });
        }
        else {
            parseComponentProps(cp);
        }
    }
    handleRecursively(component);
    return getOutArray();
}
exports.default = handleChildren;
