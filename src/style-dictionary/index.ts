import StyleDictionary from "style-dictionary";
import { FigmaDashModule } from "figma-dash-core/dist/config-handler";
import FigmaDashCore from "figma-dash-core";
import filesSelector from "./files-selector";
import lodash from "lodash";
import { File, Meta } from "../../types";
import createRegisters from "./create-registers";

export default function runStyleDictionary(
  meta: Meta[],
  module: string,
  moduleConfig: FigmaDashModule,
  core: FigmaDashCore
) {
  createRegisters(core);

  let filterFn = (file: File) => file.include;

  try {
    meta.forEach(({ src, filename }) => {
      let SDClone = lodash.cloneDeep(StyleDictionary);

      let files = filesSelector(moduleConfig, filename, module);

      files.forEach((file) => {
        let mappedInclude = [file].filter(filterFn).map(filterFn) as string[];

        if (
          src.includes(core.config.ds || "undefined") &&
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
              buildPath: moduleConfig.tokens.output.dir,
              files: [file],
            },
          },
        }).buildPlatform(module);
      });
    });
  } catch (err) {
    core.exceptionHandler(
      err,
      "Exception thrown while handling module: " + module
    );
  }
}
