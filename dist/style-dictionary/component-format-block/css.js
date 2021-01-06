"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatter = exports.name = void 0;
exports.name = "css/components";
function formatter(dictionary) {
    let components = [], props = [];
    let mapValue = ({ name, item }) => {
        if (item && typeof item != "string") {
            let prop = `--${item.name}: ${item.value};`;
            if (!props.includes(prop))
                props.push(prop);
            return `${name}: var(--${item.name});`;
        }
        else {
            return `${name}: ${item};`;
        }
    };
    dictionary.allProperties.forEach((prop) => {
        if (prop.attributes.category === (this.config.ds || "component")) {
            components.push(`.${prop.path?.join("-")} {\n ${prop.value
                .map(mapValue)
                .join("\n ")}\n}`);
        }
    });
    return ((props.length > 0 ? ":root {\n " + props.join("\n ") + "\n}\n\n" : "") +
        components.join("\n\n"));
}
exports.formatter = formatter;
