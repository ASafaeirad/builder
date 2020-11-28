const inquirer = require('inquirer');
const version = require('./version');
const prettyDiff = require('./pretty-diff');
const resolveRoot = require('./resolve');

async function selectVersion() {
  const pkg = require(resolveRoot('package.json'));

  const prompts = [
    {
      type: 'list',
      name: 'version',
      message: 'Select semver increment or specify new version',
      choices: [
        ...version.increments.map(inc => ({
          name: `${inc.padEnd(16, ' ')}${prettyDiff(pkg.version, inc)}`,
          value: inc,
        })),
        new inquirer.Separator(),
      ],
      filter: input =>
        version.isValidInput(input)
          ? version.getNewVersionFrom(pkg.version, input)
          : input,
    },
  ];

  const answers = await inquirer.prompt(prompts);
  return answers.version;
}

module.exports = selectVersion;
