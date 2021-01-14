// Put your Figma Access Token in a .env file and never share this file with strangers
require("dotenv").config();

module.exports = {
  globals: {
    /**
     * `classic` -> `type-category-id1-id2...`
     *
     * `inverted` -> `category-type-id1-id2...`
     */
    tokenNameModel: "classic",

    // These are the default patterns
    /* patterns: {
      tokenNameIdentifier: /^\$/,
      tokenValueIdentifier: /^#|^--|\d+(?=px|rem|em|%|\.\d+)/,
      parentContainerTokenIdentifier: /^:{2}/,
      childContainerTokenIdentifier: /(\w+):\W*(\w+)/,
    }, */
  },

  figma: {
    accessToken: process.env.FIGMA_ACCESS_TOKEN,

    /**
     * `https://www.figma.com/file/<id>/`
     *  or
     *  `id`
     */
    src: "aaaaaaaaaaa",

    output: "tokens/",
  },

  /**
   *   * You must declare more than zero if you are going to use 'convert-tokens'
   *   * The key of the objects must be one of:
   *    * https://amzn.github.io/style-dictionary/#/transform_groups
   *    * `default` ( default css transforms )
   *    * `native`
   */
  default: {
    tokens: {
      // https://amzn.github.io/style-dictionary/#/formats?id=filtering-tokens
      // filter: "fooFilter",

      /**
       * If you declare this property,
       * the name of the module ( default, in this case )
       * will NOT be used as a transform group
       */
      // transforms: ['name/ti/kebab'],

      output: {
        dir: "src/styles/",

        // Useless, since `files` is declared
        // extension: ".scss",

        // Useless, since `files` is declared
        // https://amzn.github.io/style-dictionary/#/formats
        // format: "scss/variables",
      },
      files: [
        {
          // '{f}' for filename
          destination: "{f}.scss",

          format: "scss/variables",

          // This property can be usefull when creating multiple files ( import without `--no-separated-tokens` flag )
          // include: "tokens/tokens.json",

          // The filter can be placed here as well
          // filter: "barFilter",
        },
      ],
    },
  },

  /**
   * You can declare files, urls or directLinks, but you cannot declare
   * `fonts: {}` if you are going to use `link-fonts`
   */
  fonts: {
    output: "assets/fonts/",

    // Optional
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
