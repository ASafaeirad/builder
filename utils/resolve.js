const path = require('path');

const resolveRoot = p => path.resolve(process.cwd(), p);

module.exports = resolveRoot;
