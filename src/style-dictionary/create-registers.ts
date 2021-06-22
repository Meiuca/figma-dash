import StyleDictionary from "style-dictionary";
import MeiucaEngineCore from "meiuca-engine-core";
import * as cssFormatBlock from "./component-format-block/css";
import * as scssFormatBlock from "./component-format-block/scss";
import * as rnFormatBlock from "./react-native-format-block";
import transformer from "./react-native-transformer";

export default function createRegisters(
  dictionary: StyleDictionary,
  core: MeiucaEngineCore
) {
  dictionary.registerTransform({
    name: "size/object",
    type: "value",
    matcher: (prop) => prop.attributes.category === "size",
    transformer,
  });

  dictionary.registerTransformGroup({
    name: "native",
    transforms: ["name/cti/camel", "size/object", "color/css"],
  });

  dictionary.registerTransformGroup({
    name: "default",
    transforms: ["name/cti/kebab"],
  });

  dictionary.registerFormat({
    ...cssFormatBlock,
    formatter: cssFormatBlock.formatter.bind(core),
  });

  dictionary.registerFormat({
    ...scssFormatBlock,
    formatter: scssFormatBlock.formatter.bind(core),
  });

  dictionary.registerFormat({
    ...rnFormatBlock,
  });

  dictionary.registerFilter({
    name: "isNotComponent",
    matcher: function (prop) {
      return (
        prop.attributes.category !== (core.config.globals.ds || "component")
      );
    },
  });
}
