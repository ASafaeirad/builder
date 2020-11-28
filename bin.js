#!/usr/bin/env node
const yargs = require('yargs');
const signale = require('signale');
const { isValidInput } = require('./utils/version');
const builder = require('./builder');
const selectVersion = require('./utils/select-version');

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
    version: {
      alias: 'v',
      requiresArg: true,
    },
    publish: {
      boolean: true,
      requiresArg: false,
      describe: 'Publish to npm registry',
    },
  })
  .help();

async function main() {
  const version = isValidInput(argv.version)
    ? argv.version
    : await selectVersion();

  const opts = {
    out: argv.outDir,
    buildCmd: argv.cmd,
    version,
    ignoreBuild: argv.ignoreBuild,
    publish: argv.publish,
  };

  argv.pack ? builder.pack(opts) : builder.build(opts);
}

main()
  .then(() => {
    signale.success('Done!');
  })
  .catch(e => {
    signale.error(e.message);
  });
