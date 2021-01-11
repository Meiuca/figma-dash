"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatter = exports.name = void 0;
exports.name = "scss/components";
function formatter(dictionary) {
    let components = [], props = [];
    let mapValue = ({ name, item }) => {
        if (item && typeof item != "string") {
            let prop = `$${item.name}: ${item.value};`;
            if (!props.includes(prop))
                props.push(prop);
            return `${name}: $${item.name};`;
        }
        else {
            return `${name}: ${item};`;
        }
    };
    dictionary.allProperties.forEach((prop) => {
        if (prop.attributes.category === (this.config.globals.ds || "component")) {
            components.push(`.${prop.path?.join("-")} {\n ${prop.value
                .map(mapValue)
                .join("\n ")}\n}`);
        }
    });
    return ((props.length > 0 ? props.join("\n") + "\n\n" : "") +
        components.join("\n\n"));
}
exports.formatter = formatter;
