const StyleDictionary = require("style-dictionary");
const exceptionHandler = require("figma-dash-core/exception-handler");

function transformer(prop) {
  let extractedNumber = +/\d+/.exec(prop.value)[0];

  if (/\d+(?=px)/.test(prop.value)) prop.value = extractedNumber;

  if (/\d+(?=\.\d+)/.test(prop.value)) prop.value = +prop.value;

  if (/\d+(?=rem|em)/.test(prop.value)) prop.value = extractedNumber * 16;

  if (/\d+(?=%)/.test(prop.value))
    prop.value = {
      original: prop.value,
      number: extractedNumber,
      decimal: extractedNumber / 100,
    };

  return prop.value;
}

function filesSelector(config, filename) {
  if (config.tokens.files)
    return config.tokens.files.map((file) => ({
      ...file,
      destination: file.destination.replace("{f}", filename),
    }));
  else
    return [
      {
        destination: filename + config.tokens.output.extension,
        format: config.tokens.output.format,
      },
    ];
}

exports.registerNativeTransformer = () => {
  StyleDictionary.registerTransform({
    name: "size/nativeSize",
    type: "value",
    matcher: (prop) =>
      /\d+(?=px|rem|em|%|\.\d+)/.test(prop.value) && !/\s/.test(prop.value),
    transformer,
  });

  StyleDictionary.registerTransformGroup({
    name: "native",
    transforms: ["name/cti/camel", "size/nativeSize", "color/css"],
  });
};

exports.runStyleDictionary = (inputFiles, group, config) => {
  try {
    inputFiles.forEach(({ src, filename }) => {
      StyleDictionary.extend({
        source: [src],
        platforms: {
          [group]: {
            transformGroup: group,
            buildPath: config.tokens.output.dir,
            files: filesSelector(config, filename),
          },
        },
      }).buildAllPlatforms();
    });
  } catch (err) {
    exceptionHandler(err);
  }
};
