module.exports = {
  ds: "jota",

  figma: {
    accessToken: "142385-65617358-2a56-4c81-8fe6-44dc301b7976",
    fileID: "irh24FKBf9HYTKyt1MqVea",
    output: "tokens/",
  },

  /* web: {
    tokens: {
      filter: "isNotComponent",
      output: {
        dir: "src/styles/web/",
        extension: ".scss",
        format: "scss/variables",
      },
    },
  }, */

  default: {
    tokens: {
      output: {
        dir: "src/styles/web/jota/",
        extension: ".css",
        format: "css/components",
      },
    },
  },

  fonts: {
    output: "assets/fonts/",
    provider: "https://fonts.googleapis.com/css2?family={f}:wght@{w}",
    files: true,
    urls: ["https://fonts.googleapis.com/css2?family=Roboto"],
  },
};
