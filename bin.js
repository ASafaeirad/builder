#!/usr/bin/env node
const yargs = require('yargs');
const builder = require('./index');

const { argv } = yargs
  .options({
    outDir: {
      alias: 'o',
      requiresArg: false,
      describe: 'Output directory for lib',
      default: 'lib',
    },
    cmd: {
      alias: 'c',
      requiresArg: false,
      describe: 'build command',
      default: 'npm run build',
    },
    ignoreBuild: {
      boolean: true,
      describe: 'Ignore build command',
    },
    pack: {
      requiresArg: false,
      describe: 'Generate output pack',
    },
    publish: {
      boolean: true,
      requiresArg: false,
      describe: 'Publish to npm registry',
    },
  })
  .help();

const opts = { out: argv.out, buildCmd: argv.cmd };

argv.pack ? builder.pack(opts) : builder.build(opts);
