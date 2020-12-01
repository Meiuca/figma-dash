const {
  getOutArray,
  parseComponentProps,
} = require("./component-props-parser");

exports.handleChildren = (component) => {
  if (component.children) {
    component.children.forEach((child) => {
      if (child.children) {
        parseComponentProps(child);

        exports.handleChildren(child);
      } else {
        parseComponentProps(component);
      }
    });
  } else {
    parseComponentProps(component);
  }
};

exports.getOutArray = getOutArray;
