"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(tokenNameModel, tokenNamesFlat) {
    let attributes = {};
    let category = tokenNamesFlat[tokenNameModel == "inverted" ? 0 : 1];
    attributes.category = category;
    switch (tokenNameModel) {
        case "inverted":
            attributes.type = tokenNamesFlat[1];
            break;
        default:
            attributes.type = tokenNamesFlat[0];
            break;
    }
    if (attributes.category == "level" && attributes.type != "opacity")
        attributes.category = "size";
    return attributes;
}
exports.default = default_1;
