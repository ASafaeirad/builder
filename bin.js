#!/usr/bin/env node
const yargs = require('yargs');
const builder = require('./index');

const { argv } = yargs
  .options({
    out: {
      alias: 'o',
      requiresArg: false,
      describe: 'Output directory for lib',
      array: false,
    },
    files: {
      alias: 'f',
      requiresArg: false,
      describe: 'Files to include in lib',
      array: true,
    },
    pack: {
      requiresArg: false,
      describe: 'Just pack instead of publish',
      array: false,
    },
    cmd: {
      alias: 'c',
      requiresArg: false,
      describe: 'build command',
      array: false,
    },
    publish: {
      alias: 'p',
      requiresArg: false,
      describe: 'Publish to npm registry',
      array: false,
    }
  })
  .help();

const opts = {};

if (argv.out) {
  opts.out = argv.out || 'lib';
}

if (argv.files) {
  opts.files = argv.files;
}

if (argv.cmd) {
  opts.buildCmd = argv.cmd;
}

argv.pack
  ? builder.pack(opts)
  : builder.build(opts);
