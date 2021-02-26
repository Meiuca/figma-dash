"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatter = exports.name = void 0;
exports.name = "javascript/react-native";
function formatter(dictionary) {
    let hasSizeToken = dictionary.allProperties.some((prop) => prop.attributes.category == "size");
    let to_ret = dictionary.allProperties
        .map(function (prop) {
        let prop_value;
        if (prop.attributes.category == "size") {
            if (prop.attributes.type == "font") {
                prop_value = `PixelRatio.getFontScale() * ${parseFloat(prop.value)}`;
            }
            else {
                prop_value = `PixelRatio.get() * ${parseFloat(prop.value)}`;
            }
        }
        else {
            prop_value = JSON.stringify(prop.value);
        }
        let to_ret = `export const ${prop.name} = ${prop_value};`;
        if (prop.comment)
            to_ret = to_ret.concat(" // " + prop.comment);
        return to_ret;
    })
        .join("\n");
    return ((hasSizeToken ? "import { PixelRatio } from 'react-native';\n\n" : "") +
        to_ret);
}
exports.formatter = formatter;
