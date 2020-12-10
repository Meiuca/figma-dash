const config = require("figma-dash-core/config-handler").handle();

exports.name = "css/components";

exports.formatter = ({ allProperties }) => {
  let components = [],
    props = [];

  let mapValue = ({ name, item }) => {
    if (item.value && item.name) {
      props.push(`--${item.name}: ${item.value};`);

      return `${name}: var(--${item.name});`;
    } else {
      return `${name}: ${item};`;
    }
  };

  allProperties.forEach((prop) => {
    if (prop.attributes.category === (config.ds || "component")) {
      components.push(
        `.${prop.name} {\n ${prop.value.map(mapValue).join("\n ")}\n}`
      );
    }
  });

  return (
    (props.length > 0 ? ":root {\n " + props.join("\n ") + "\n}\n\n" : "") +
    components.join("\n\n")
  );
};
