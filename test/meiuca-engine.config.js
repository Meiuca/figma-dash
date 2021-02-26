module.exports = {
  globals: {
    ds: "jota",
    // tokenNameModel: "inverted",
  },

  figma: {
    accessToken: "142385-65617358-2a56-4c81-8fe6-44dc301b7976",
    src:
      "https://www.figma.com/file/U5uzb8VJKmsiUWehyk5iPo/Design-Tokens-Figma-Dash?node-id=0%3A1",
    output: "tokens/",
  },

  foo: {
    tokens: {
      transforms: ["name/cti/camel"],
      output: {
        dir: "src/styles/web/",
        extension: ".js",
        format: "javascript/react-native",
      },
    },
  },

  default: {
    tokens: {
      output: {
        dir: "src/styles/web/jota/",
      },
      files: [
        {
          destination: "{f}.css",
          format: "css/variables",
        },
        {
          destination: "{f}.json",
          format: "json/flat",
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
