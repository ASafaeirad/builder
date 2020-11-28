#!/usr/bin/env node
const yargs = require('yargs');
const builder = require('./index');

const { argv } = yargs
  .options({
    out: {
      alias: 'o',
      requiresArg: false,
      describe: 'Output directory for lib',
      default: 'lib',
    },
    ignoreBuild: {
      boolean: true,
      describe: 'Ignore build command',
    },
    pack: {
      requiresArg: false,
      describe: 'Just pack instead of publish',
    },
    cmd: {
      alias: 'c',
      requiresArg: false,
      describe: 'build command',
      default: 'npm run build',
    },
    publish: {
      alias: 'p',
      boolean: true,
      requiresArg: false,
      describe: 'Publish to npm registry',
    },
  })
  .help();

const opts = { out: argv.out, buildCmd: argv.cmd };

argv.pack ? builder.pack(opts) : builder.build(opts);
