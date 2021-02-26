"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(tokenNameModel, tokenNamesFlat) {
    let attributes = {};
    attributes.category = tokenNamesFlat[tokenNameModel == "inverted" ? 0 : 1];
    attributes.type = tokenNamesFlat[tokenNameModel == "inverted" ? 1 : 0];
    let alternativeSize = [
        attributes.category == "level" && attributes.type != "opacity",
        attributes.category == "width",
        attributes.category == "radius",
    ];
    if (alternativeSize.includes(true))
        attributes.category = "size";
    return attributes;
}
exports.default = default_1;
