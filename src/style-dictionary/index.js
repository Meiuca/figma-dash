const StyleDictionary = require("style-dictionary");
const exceptionHandler = require("figma-dash-core/exception-handler");
const config = require("figma-dash-core/config-handler").handle();
const transformer = require("./react-native-transformer");
const filesSelector = require("./files-selector");
const cssFormatBlock = require("./component-format-block/css");
const scssFormatBlock = require("./component-format-block/scss");

StyleDictionary.registerFilter({
  name: "isNotComponent",
  matcher: function (prop) {
    return prop.attributes.category !== (config.ds || "component");
  },
});

StyleDictionary.registerFormat(cssFormatBlock);

StyleDictionary.registerFormat(scssFormatBlock);

StyleDictionary.registerTransform({
  name: "size/object",
  type: "value",
  matcher: (prop) => prop.attributes.category === "size",
  transformer,
});

StyleDictionary.registerTransformGroup({
  name: "native",
  transforms: ["name/cti/camel", "size/object", "color/css"],
});

StyleDictionary.registerTransformGroup({
  name: "default",
  transforms: ["name/cti/kebab"],
});

module.exports = (meta, module, config) => {
  try {
    meta.forEach(({ src, filename }) => {
      StyleDictionary.extend({
        source: [src],
        platforms: {
          [module]: {
            transformGroup: module,
            buildPath: config.tokens.output.dir,
            files: filesSelector(config, filename, module),
          },
        },
      }).buildAllPlatforms();
    });
  } catch (err) {
    exceptionHandler(err, "Exception thrown while handling module " + module);
  }
};
