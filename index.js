const fs = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

function prepare({ files = [], out = 'lib', buildCmd = 'build' }) {
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

  if (buildCmd && pkg.scripts[buildCmd]) {
    const res = spawnSync('npm', ['run', buildCmd], { cwd: root, stdio: 'inherit' });
    if (res.status !== 0) {
      throw Error('Build Failed');
    }
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  requiredFiles.map(file => fs.copyFileSync(path.join(root, file), path.join(outDir, file)));

  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(pkg, {}, 2));
}

function pack(opt = {}) {
  const { out = 'lib' } = opt;

  prepare(opt);
  spawn('npm', ['pack'], { cwd: out, stdio: 'inherit' });
}

function build(opt = {}) {
  const { out = 'lib' } = opt;

  prepare(opt);
  spawn('npm', ['publish', '--access=public'], { cwd: out, stdio: 'inherit' });
}

module.exports = {
  build,
  pack,
};
