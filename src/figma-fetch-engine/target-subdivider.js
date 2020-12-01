const { writeFileSync, existsSync, mkdirSync } = require("fs");
const { cleanStr } = require("figma-dash-core/functions");
const lodash = require("lodash");
const prettier = require("prettier");
const path = require("path");
const config = require("figma-dash-core/config-handler").handle();

function subdivide(item, parentOut, output) {
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

module.exports = (target, output) => {
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
};
