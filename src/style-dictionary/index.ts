import StyleDictionary from "style-dictionary";
import { MeiucaEngineModule } from "meiuca-engine-core/dist/config-handler";
import MeiucaEngineCore, { MeiucaEngineError } from "meiuca-engine-core";
import filesSelector from "./files-selector";
import lodash from "lodash";
import { File, Meta } from "../../types";
import createRegisters from "./create-registers";

export default function runStyleDictionary(
  meta: Meta[],
  module: string,
  moduleConfig: MeiucaEngineModule,
  core: MeiucaEngineCore
) {
  createRegisters(StyleDictionary, core);

  let filterFn = (file: File) => file.include;

  try {
    meta.forEach(({ src, filename }) => {
      let SDClone = lodash.cloneDeep(StyleDictionary);

      let files = filesSelector(moduleConfig, filename, module);

      files.forEach((file) => {
        let mappedInclude = [file].filter(filterFn).map(filterFn) as string[];

        if (
          src.includes(core.config.globals.ds || "undefined") &&
          mappedInclude.length == 0
        ) {
          return;
        }

        SDClone.extend({
          ...moduleConfig,
          source: [src],
          include: mappedInclude,
          platforms: {
            [module]: {
              ...(moduleConfig.tokens.transforms
                ? { transforms: moduleConfig.tokens.transforms }
                : { transformGroup: module }),
              buildPath: moduleConfig.tokens.output.dir,
              files: [file],
            },
          },
        }).buildPlatform(module);
      });
    });
  } catch (err) {
    throw new MeiucaEngineError(
      err,
      `Exception thrown while handling module: ${module}`
    );
  }
}
