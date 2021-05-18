# Meiuca Engine

This engine obtains the tokens described in figma and converts them to a json or javascript file, depending on the configuration.

## Installation

To use just run the command bellow

```bash
  yarn
```

## Configuration (basic)

Access the file `meiuca-engine.config.js` and manipulated this options bellow.

### Figma

| Parameter     | Description                                                                                           |
| :------------ | :---------------------------------------------------------------------------------------------------- |
| `accessToken` | Your Figma key ( [create you key access figma](https://www.figma.com/developers/api#access-tokens]) ) |
| `src`         | Link file in figma to exports tokens                                                                  |
| `output`      | Output tokens exported from figma                                                                     |

#### Example

```js
figma: {
  accessToken: '189821-10d74047-8ea1-4d5c-bc28-368a40adf861',
  src: 'https://www.figma.com/file/NEXaAtzC4PO0GdK1KJ2uYY/Zero-%7C-Design-Tokens-(Copy)?node-id=0%3A1',
  output: 'tokens/',
},
```

| Parameter                  | Description                                                                                                                             |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens.transforms`        | Option to transform file output ( [read more options](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) ) |
| `tokens.output.dir`        | Path to generated and save your tokens                                                                                                  |
| `tokens.files.destination` | Name to save your token                                                                                                                 |
| `tokens.files.format`      | Configure to format export tokens ( [read more this from here](https://amzn.github.io/style-dictionary/#/formats) )                     |

#### Example

```js
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
```

## Generate tokens

```js
yarn generate
```

## :warning: Informations important

This engine needs some settings in the Figma file to generate correctly.
This will be added later in this same file.
