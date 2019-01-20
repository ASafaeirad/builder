const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

function prepare({ files, out }) {
  const root = process.cwd();

  const pkgFile = path.join(root, 'package.json');
  const pkg = require(pkgFile);

  Reflect.deleteProperty(pkg, 'private');

  const outDir = path.join(root, out);

  const requiredFiles = [
    'LICENSE',
    'README.md',
    ...files,
  ];

  spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit' });

  requiredFiles.map(file => fs.copyFileSync(path.join(root, file), path.join(outDir, file)));

  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(pkg, {}, 2));
}

function build(opt = { out: 'lib' }) {
  const { out } = opt;
  prepare(opt);
  spawn('npm', ['pack'], { cwd: out, stdio: 'inherit' });
}

function pack(opt = { out: 'lib' }) {
  const { out } = opt;
  prepare(opt);
  spawn('npm', ['publish', '--access=public'], { cwd: out, stdio: 'inherit' });
}

module.exports = {
  build,
  pack,
};
