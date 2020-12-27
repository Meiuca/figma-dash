import StyleDictionary from "style-dictionary";
import { ExceptionHandler, ConfigHandler } from "figma-dash-core";
import transformer from "./react-native-transformer";
import filesSelector from "./files-selector";
import * as cssFormatBlock from "./component-format-block/css";
import * as scssFormatBlock from "./component-format-block/scss";
import lodash from "lodash";

import { File, Meta } from "../../types";

const dashConfig = ConfigHandler.handle();

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

export default function (
  meta: Meta[],
  module: string,
  config: import("figma-dash-core").ConfigHandler.FigmaDashModule
) {
  let filterFn = (file: File) => file.include;

  try {
    meta.forEach(({ src, filename }) => {
      let SDClone = lodash.cloneDeep(StyleDictionary);

      let files = filesSelector(config, filename, module);

      files.forEach((file) => {
        let mappedInclude = [file].filter(filterFn).map(filterFn);

        if (
          src.includes(dashConfig.ds || "undefined") &&
          mappedInclude.length == 0
        ) {
          return;
        }

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
    ExceptionHandler(err, "Exception thrown while handling module: " + module);
  }
}
