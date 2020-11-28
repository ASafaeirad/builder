# @frontendmonster/builder

Simple build script for my FOS projects.
run build command, copy package.files and pacage.json to outdir

## Instalation

```bash
npm install --save-dev @frontendmonster/builder
```

or

```sh
yarn add --dev @frontendmonster/builder
```

## Usage

```sh
builder [options]
```

## Options:

| arg           | alias | description                           |
| ------------- | ----- | ------------------------------------- |
| --outDir      | -o    | output directory (default: lib)       |
| --cmd         | -c    | build commad (default: npm run build) |
| --ignoreBuild |       | ignore build command                  |
| --pack        |       | generate output pack                  |
| --publish     |       | pulish package with npm               |
