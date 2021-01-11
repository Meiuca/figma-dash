module.exports = {
  globals: {
    ds: "jota",
    // tokenNameModel: "inverted",
  },

  figma: {
    accessToken: "142385-65617358-2a56-4c81-8fe6-44dc301b7976",
    src: "irh24FKBf9HYTKyt1MqVea",
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
      },
      files: [
        {
          destination: "{f}.css",
          format: "css/components",
        },
        {
          destination: "{f}.scss",
          format: "scss/components",
        },
      ],
    },
  },

  fonts: {
    output: "assets/fonts/",
    provider: "https://fonts.googleapis.com/css2?family={f}:wght@{w}",
    files: true,
    urls: ["https://fonts.googleapis.com/css2?family=Roboto"],
  },
};
