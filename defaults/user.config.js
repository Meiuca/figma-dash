// Put your Figma Access Token in a .env file and never share this file with strangers
require("dotenv").config();

module.exports = {
  /* These are the default patterns
   *   patterns: {
   *     tokenNameIdentifier: /^\$/,
   *     tokenValueIdentifier: /^#|^~|\d+(?=px|rem|em|%|\.\d+)/,
   *     parentContainerTokenIdentifier: /^:{2}/,
   *     childContainerTokenIdentifier: /^:{1}/,
   *   },
   */

  /**
   * Your Design System identifier.
   * Use only lowercase letters
   */
  ds: "jota",

  figma: {
    accessToken: process.env.FIGMA_ACCESS_TOKEN,

    fileID: "aaaaaaaaaaaaaaaaaaaaaa",

    output: "tokens/",
  },

  /**
   *   * You must declare more than zero if you are going to use 'jota-web convert-tokens'
   *   * The key of the objects must be one of:
   *    * https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md
   *    * `default` ( default web transforms )
   *    * `native`
   */
  default: {
    // `isNotComponent` can also be declared here
    // filter: "isNotComponent",

    tokens: {
      output: {
        dir: "src/styles/web/",
      },
      files: [
        {
          // '{f}' for filename
          destination: "{f}-components.scss",

          /**
           * One of:
           *  * https://github.com/amzn/style-dictionary/blob/main/docs/formats.md
           *  * `css/components`
           *  * `scss/components`
           */
          format: "scss/components",
        },
        {
          destination: "{f}-variables.scss",

          format: "scss/variables",

          // `isNotComponent` is a custom internal filter that cleans dirty output generated
          // by formatters that do not support components
          filter: "isNotComponent",
        },
      ],
    },
  },

  /*
   * native: {
   *   tokens: {
   *     output: {
   *       dir: "src/styles/native/",
   *       extension: ".js",
   *       format: "javascript/es6",
   *     },
   *   },
   * },
   */

  /**
   * You can declare files, urls or directLinks, but you cannot declare
   * `fonts: {}` if you are going to use `jota-web link-fonts`
   */
  fonts: {
    output: "assets/fonts/",

    linkCommand: "yarn react-native link",

    /**
     * Use the key `{f}` to declare where the font family name must be placed and `{w}` to the weight
     *
     * Required if `files: true`
     */
    provider: "https://fonts.googleapis.com/css2?family={f}:wght@{w}",

    /**
     * If false, the API will not search for fonts in your tokens
     */
    files: true,

    urls: ["https://fonts.googleapis.com/css2?family=Roboto"],

    directLinks: [
      {
        src:
          "https://devimages-cdn.apple.com/design/resources/download/SF-Font-Pro.dmg",

        local: "SF-Font-Pro.dmg",
      },
    ],
  },
};
