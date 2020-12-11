const config = require("figma-dash-core/config-handler").handle();

exports.name = "scss/components";

exports.formatter = ({ allProperties }) => {
  let components = [],
    props = [];

  let mapValue = ({ name, item }) => {
    if (item.value && item.name) {
      let prop = `$${item.name}: ${item.value};`;

      if (!props.includes(prop)) props.push(prop);

      return `${name}: $${item.name};`;
    } else {
      return `${name}: ${item};`;
    }
  };

  allProperties.forEach((prop) => {
    if (prop.attributes.category === (config.ds || "component")) {
      components.push(
        `.${prop.path.join("-")} {\n ${prop.value.map(mapValue).join("\n ")}\n}`
      );
    }
  });

  return (
    (props.length > 0 ? props.join("\n") + "\n\n" : "") +
    components.join("\n\n")
  );
};
