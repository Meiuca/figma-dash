"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(tokenValue, attributes, core) {
    if (!tokenValue.chars || attributes.category !== core.config.ds)
        return tokenValue;
    let componentPropsRegExp = /(.+):(.+)(?:;|\n|$)/;
    let componentProps = [];
    while (componentPropsRegExp.test(tokenValue.chars)) {
        let mappedChars = componentPropsRegExp.exec(tokenValue.chars);
        if (!mappedChars || !mappedChars[0] || !mappedChars[1] || !mappedChars[2])
            break;
        tokenValue.chars = tokenValue.chars.replace(mappedChars[0], "");
        mappedChars[2] = mappedChars[2].replace(/^\s*/g, "");
        let parsedChars = (/[A-Za-z0-9\-_]+/.exec(mappedChars[2]) || [""])[0];
        let parsedItem = core.functions.tokenNameRegexTest(mappedChars[2])
            ? "{" + parsedChars.replace(/-/g, ".") + "}"
            : parsedChars.replace(/;/g, "");
        componentProps.push({
            name: mappedChars[1],
            item: parsedItem,
        });
    }
    return componentProps.length > 0 ? componentProps : tokenValue;
}
exports.default = default_1;
