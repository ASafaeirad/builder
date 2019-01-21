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
      alias: 'p',
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
  })
  .help();

const opts = {};

if (argv.out) {
  opts.out = argv.out;
}

if (argv.files) {
  opts.files = argv.files;
}

if (argv.cmd) {
  opts.buildCmd = argv.cmd;
}

if (argv.pack) {
  builder.pack(opts);
} else {
  builder.build(opts);
}
