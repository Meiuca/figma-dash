const StyleDictionary = require("style-dictionary");
const exceptionHandler = require("figma-dash-core/exception-handler");
const config = require("figma-dash-core/config-handler").handle();
const lodash = require("lodash");

StyleDictionary.registerFilter({
  name: "isNotComponent",
  matcher: function (prop) {
    return prop.attributes.category !== (config.ds || "component");
  },
});

function transformer(prop) {
  let extractedNumber = parseFloat(prop.value);

  if (isNaN(extractedNumber)) return prop.value;

  return {
    original: prop.value,
    number: extractedNumber,
    scale: extractedNumber * 16,
    decimal: extractedNumber / 100,
  };
}

function filesSelector(config, filename, group) {
  if (group.includes("ios") || group.includes("flutter"))
    filename = lodash.upperFirst(lodash.camelCase(filename.replace(/-/g, " ")));

  if (group.includes("android"))
    filename = lodash.snakeCase(filename.replace(/-/g, " "));

  if (config.tokens.files) {
    return config.tokens.files.map((file) => ({
      ...file,
      destination: file.destination.replace(/\{f\}/g, filename),
      className: filename,
      mapName: filename,
      filter: file.format != "scss/components" ? "isNotComponent" : false,
    }));
  } else {
    return [
      {
        destination: filename + config.tokens.output.extension,
        format: config.tokens.output.format,
        className: filename,
        mapName: filename,
        filter:
          config.tokens.output.format != "scss/components"
            ? "isNotComponent"
            : false,
      },
    ];
  }
}

exports.registerNativeTransformer = () => {
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
};

exports.registerDefaultTransformer = () => {
  StyleDictionary.registerTransformGroup({
    name: "default",
    transforms: ["name/cti/kebab"],
  });
};

exports.runStyleDictionary = (meta, group, config) => {
  try {
    meta.forEach(({ src, filename }) => {
      StyleDictionary.extend({
        source: [src],
        platforms: {
          [group]: {
            transformGroup: group,
            buildPath: config.tokens.output.dir,
            files: filesSelector(config, filename, group),
          },
        },
      }).buildAllPlatforms();
    });
  } catch (err) {
    exceptionHandler(err);
  }
};
