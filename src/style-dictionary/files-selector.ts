import lodash from "lodash";
import { MeiucaEngineModule } from "meiuca-engine-core/dist/config-handler";

import { File } from "../../types";

export default function (
  config: MeiucaEngineModule,
  filename: string,
  group: string
): File[] {
  if (group.includes("ios") || group.includes("flutter"))
    filename = lodash.upperFirst(lodash.camelCase(filename.replace(/-/g, " ")));

  if (group.includes("android"))
    filename = lodash.snakeCase(filename.replace(/-/g, " "));

  if (config.tokens.files) {
    return config.tokens.files.map((file) => ({
      ...config.tokens,
      ...file,
      destination: file.destination.replace(/\{f\}/g, filename),
      className: filename,
      mapName: filename,
    }));
  } else {
    return [
      {
        ...config.tokens,
        destination: filename + config.tokens.output.extension,
        format: config.tokens.output.format,
        className: filename,
        mapName: filename,
      },
    ];
  }
}
