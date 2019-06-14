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
    'CHANGELOG.md',
    '.npmignore',
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

function publis(out = 'lib') {
  spawn('npm', ['publish', '--access=public'], { cwd: out, stdio: 'inherit' });
}

function pack(out = 'lib') {
  spawn('npm', ['pack'], { cwd: out, stdio: 'inherit' });
}

function pack(opt = {}) {
  prepare(opt);
  pack(opt.out)
}

function build(opt = {}) {
  prepare(opt);
  opt.publish && publis(opt.out);
}

module.exports = {
  build,
  pack,
};
