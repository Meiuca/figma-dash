module.exports = {
  // These are the default patterns
  // patterns: {
  //   tokenNameIdentifier: /^\$/,

  //   tokenValueIdentifier: /^#|^~|\d+(?=px|rem|em|%|\.\d+)/,

  //   parentContainerTokenIdentifier: /:{2}/,

  //   childContainerTokenIdentifier: /:{1}/,
  // },

  figma: {
    accessToken: "000000-00000000-0000-0000-0000-000000000000",

    fileID: "aaaaaaaaaaaaaaaaaaaaaa",

    output: "tokens/",
  },

  // * You must declare more than zero if you are going to use 'jota-web convert-tokens'
  // * The key of the objects must be one of
  // https://github.com/amzn/style-dictionary/blob/master/lib/common/transformGroups.js
  // or
  // 'native'
  scss: {
    tokens: {
      output: {
        dir: "src/styles/web/",

        extension: ".scss",

        // https://github.com/amzn/style-dictionary/blob/master/lib/common/formats.js#L90
        format: "scss/variables",
      },
    },
  },

  // native: {
  //   tokens: {
  //     output: {
  //       dir: "src/styles/native/",

  //       extension: ".js",

  //       format: "javascript/es6",
  //     },
  //   },
  // },

  // ios: {
  //   tokens: {
  //     output: {
  //       dir: "src/styles/ios/",
  //     },
  //     files: [
  //       {
  //         // '{f}' for filename
  //         destination: "{f}.h",

  //         format: "ios/singleton.h",
  //       },
  //       {
  //         destination: "{f}.m",

  //         format: "ios/singleton.m",
  //       }
  //     ],
  //   },
  // },

  // You can declare files, urls or directLinks, but you cannot declare
  // 'fonts: {}' if you are going to use 'jota-web link-fonts'
  fonts: {
    output: "assets/fonts/",

    linkCommand: "yarn react-native link",

    // Use the key '{f}' to declare where the font family name must be placed and '{w}' to the weight
    provider: "https://fonts.googleapis.com/css2?family={f}:wght@{w}",

    files: ["tokens/tokens.json"],

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
