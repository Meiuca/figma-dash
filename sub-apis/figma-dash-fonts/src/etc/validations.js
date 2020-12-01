const config = require("../config-handler").handle();
const lodash = require("lodash");
const path = require("path");

exports.validateFonts = () => {
  if (lodash.isEmpty(config.fonts))
    throw new Error("fonts object is not valid");

  if (typeof config.fonts.output != "string")
    throw new TypeError("outPath must be declared and must be a string");

  if (typeof config.fonts.linkCommand != "string")
    throw new TypeError("linkCommand must be declared and must be a string");

  if (!config.fonts.provider && config.fonts.files)
    throw new TypeError("provider must be declared");

  if (config.fonts.provider && !config.fonts.provider.includes("http"))
    throw new Error("provider is not a valid url");

  if (config.fonts.provider && !config.fonts.provider.includes("{f}"))
    throw new SyntaxError("provider must include '{f}'");

  if (config.fonts.provider && !config.fonts.provider.includes("{w}"))
    throw new SyntaxError("provider must include '{w}'");

  if (
    config.fonts.files &&
    (!Array.isArray(config.fonts.files) ||
      config.fonts.files.some((file) => typeof file != "string"))
  )
    throw new TypeError("files must be an string array");

  if (
    config.fonts.urls &&
    (!Array.isArray(config.fonts.urls) ||
      config.fonts.urls.some((url) => typeof url != "string"))
  )
    throw new TypeError("urls must be an string array");

  if (
    config.fonts.directLinks &&
    (!Array.isArray(config.fonts.directLinks) ||
      config.fonts.directLinks.some(
        ({ src, local }) => typeof src != "string" || typeof local != "string"
      ))
  )
    throw new TypeError(
      "directLinks must be an array containing '{ src: string, local: string }'"
    );
};

exports.validateFigmaConfig = () => {
  if (lodash.isEmpty(config.figma))
    throw new Error("figma object is not valid");

  if (typeof config.figma.accessToken != "string")
    throw new TypeError("accessToken must be a string");

  if (typeof config.figma.fileID != "string")
    throw new TypeError("fileID must be a string");

  if (lodash.isError(path.resolve(config.figma.output)))
    throw new Error(
      chalk.gray(config.figma.output) + " is not a valid output path"
    );
};
