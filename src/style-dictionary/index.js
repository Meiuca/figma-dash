const StyleDictionary = require("style-dictionary");
const exceptionHandler = require("figma-dash-core/exception-handler");
const dashConfig = require("figma-dash-core/config-handler").handle();
const transformer = require("./react-native-transformer");
const filesSelector = require("./files-selector");
const cssFormatBlock = require("./component-format-block/css");
const scssFormatBlock = require("./component-format-block/scss");
const lodash = require("lodash");

StyleDictionary.registerFilter({
  name: "isNotComponent",
  matcher: function (prop) {
    return prop.attributes.category !== (dashConfig.ds || "component");
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
  let filterFn = (file) => file.include;

  try {
    meta.forEach(({ src, filename }) => {
      let SDClone = lodash.cloneDeep(StyleDictionary);

      let files = filesSelector(config, filename, module);

      files.forEach((file) => {
        let mappedInclude = [file].filter(filterFn).map(filterFn);

        if (src.includes(dashConfig.ds) && mappedInclude.length == 0) return;

        SDClone.extend({
          source: [src],
          include: mappedInclude,
          platforms: {
            [module]: {
              transformGroup: module,
              buildPath: config.tokens.output.dir,
              files: [file],
            },
          },
        }).buildPlatform(module);
      });
    });
  } catch (err) {
    exceptionHandler(err, "Exception thrown while handling module: " + module);
  }
};
