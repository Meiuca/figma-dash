module.exports = {
  figma: {
    accessToken: '',
    src: '',
    output: 'tokens/',
  },

  foo: {
    tokens: {
      transforms: ['name/cti/camel'],
      output: {
        dir: './',
      },
      files: [
        {
          destination: 'branding.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
};