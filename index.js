const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');
const signale = require('signale');

const resolveRoot = p => path.resolve(process.cwd(), p);

function prepare({ out, buildCmd }) {
  const pkgFile = resolveRoot('package.json');
  const pkg = require(pkgFile);
  Reflect.deleteProperty(pkg, 'private');
  const outDir = resolveRoot(out);

  if (!buildCmd)
    throw Error(
      'Warning: Build command not found, use "-c <command>" or "--ignoreBuild"',
    );

  const [cmd, ...args] = buildCmd.split(' ');

  const res = spawnSync(cmd, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (res.status !== 0) throw Error(`command "${buildCmd}" Failed`);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  const files = pkg.files;
  files.forEach(file => {
    const src = resolveRoot(file);
    if (!fs.existsSync(src)) {
      signale.warn(`file "${file}" not found. but it's in package.files.`);
      return;
    }

    fs.copyFileSync(src, path.join(outDir, file));
  });

  fs.writeFileSync(
    path.join(outDir, 'package.json'),
    JSON.stringify(pkg, {}, 2),
  );
}

function spawnPublis(out = 'lib') {
  spawn('npm', ['publish', '--access=public'], { cwd: out, stdio: 'inherit' });
}

function spawnPack(out = 'lib') {
  spawn('npm', ['pack'], { cwd: out, stdio: 'inherit' });
}

function pack(opt) {
  prepare(opt);
  spawnPack(opt.out);
}

function build(opt) {
  prepare(opt);
  opt.publish && spawnPublis(opt.out);
}

module.exports = {
  build,
  pack,
};
