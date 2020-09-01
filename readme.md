# Phaser 3 TypeScript Examples
> Various examples and uses for Phaser 3 features in TypeScript for game development

![License](https://img.shields.io/badge/license-MIT-green)

## Prerequisites

This examples repository assumes Parcel is installed globally:

```bash
npm install -g parcel-bundler
```

## Getting Started

Each example can be run individually with this command:

```bash
npm run start -- --example=actions/grid-action
```

The `--examples` parameter takes the path to the example that you would like run. All the example code is in the `src` folder. In the command above, we are running the example located at `actions/grid-action` in the `src` folder.

You can also run all the examples at once although it could take a while to build or run out of heap memory. Not exactly sure why but it is being investigated.

But if you want to try then build the root `index.html` file and then run the `start-root` script 👇

```bash
npm run build-root-index

npm run start-root
```

## Static Assets

All static assets used by the examples are located in the `public` folder.

## Ourcade Examples

You can find these examples at https://examples.ourcade.co

There is a script that goes through all the examples and generates data for each to be included into Ourcade Examples. The code in this repository may be newer than the versions deployed to Ourcade Examples but we try to keep then in sync.

## License

[MIT License](https://github.com/ourcade/phaser3-typescript-examples/blob/master/LICENSE)
