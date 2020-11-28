const semver = require('semver');

const increments = [
  'patch',
  'minor',
  'major',
  'prepatch',
  'preminor',
  'premajor',
  'prerelease',
];

const isValidVersion = input => Boolean(semver.valid(input));

const isValidInput = input =>
  increments.includes(input) || isValidVersion(input);

const validate = version => {
  if (!isValidVersion(version))
    throw new Error('Version should be a valid semver version.');
};

const satisfies = (version, range) => {
  validate(version);
  return semver.satisfies(version, range, { includePrerelease: true });
};

function verifyRequirementSatisfied(dependency, version) {
  const depRange = require('../package.json').engines[dependency];
  if (!satisfies(version, depRange)) {
    throw new Error(`Please upgrade to ${dependency}${depRange}`);
  }
}

function isPrerelease(version) {
  return Boolean(semver.prerelease(version));
}

function getNewVersionFrom(version, input) {
  validate(version);

  if (!isValidInput(input)) {
    throw new Error(
      `Version should be either ${increments.join(
        ', ',
      )} or a valid semver version.`,
    );
  }

  return increments.includes(input) ? semver.inc(version, input) : input;
}

function isGte(version, otherVersion) {
  validate(version);
  validate(otherVersion);

  return semver.gte(otherVersion, version);
}

function isLte(version, otherVersion) {
  validate(version);
  validate(otherVersion);

  return semver.lte(otherVersion, version);
}

module.exports = {
  increments,
  isValidInput,
  validate,
  verifyRequirementSatisfied,
  getNewVersionFrom,
  isPrerelease,
  isGte,
  isLte,
};
