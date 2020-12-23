import { writeFileSync, existsSync, mkdirSync } from "fs";
import { cleanStr } from "figma-dash-core/functions";
import lodash from "lodash";
import prettier from "prettier";
import path from "path";
import { handle } from "figma-dash-core/config-handler";

import { Target, Entry, Meta } from "../../types";

const config = handle();

function subdivide(item: Entry, parentOut: string, output: Meta[]) {
  Object.entries(item[1]).forEach((subItem) => {
    if (
      subItem[0] == "level" ||
      (Object.keys(subItem[1]).length < 2 && Object.keys(item[1]).length < 2)
    )
      return;

    let outPath = path.resolve(parentOut, `./${subItem[0]}.json`);

    writeFileSync(
      outPath,
      prettier.format(
        JSON.stringify({ [item[0]]: { [subItem[0]]: subItem[1] } }),
        {
          parser: "json",
        }
      )
    );

    output.push({ src: outPath, filename: `${item[0]}-${subItem[0]}` });
  });
}

export default function (target: Target, output: Meta[]) {
  Object.entries(target).forEach((item) => {
    let clearOutFolderPath = cleanStr(item[0]);

    let parentOut = path.resolve(
      config.figma.output,
      "./" + clearOutFolderPath
    );

    if (!existsSync(parentOut)) mkdirSync(parentOut, { recursive: true });

    subdivide(item, parentOut, output);

    let out = path.resolve(parentOut, "./index.json");

    let outContent = { [item[0]]: item[1] };

    if (existsSync(out)) {
      let contentToBeMerged = require(path.resolve(out));

      outContent = lodash.merge(outContent, contentToBeMerged);
    }

    writeFileSync(
      out,
      prettier.format(JSON.stringify(outContent), {
        parser: "json",
      })
    );

    let metaToBePushed = {
      src: out,
      filename: clearOutFolderPath,
    };

    if (!output.some(({ filename }) => filename == metaToBePushed.filename))
      output.push(metaToBePushed);
  });
}
