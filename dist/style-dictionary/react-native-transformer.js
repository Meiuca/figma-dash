"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(prop) {
    let extractedNumber = parseFloat(prop.value);
    if (isNaN(extractedNumber))
        return prop.value;
    return {
        original: prop.value,
        number: extractedNumber,
        scale: extractedNumber * 16,
        decimal: extractedNumber / 100,
    };
}
exports.default = default_1;
