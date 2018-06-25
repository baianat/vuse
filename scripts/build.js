const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { rollup } = require('rollup');
const { promisify } = require('util');

const mkdirp = promisify(mkdirpNode);
const { paths, builds, banner, plugins, utils } = require('./config');

// build main plugin
async function buildScript (build) {
  await mkdirp(paths.dist);
  console.log(chalk.cyan(`📦  Generating ${build.output}...`));

  const inputOptions = {
    input: paths.input,
    plugins: build.plugins
  }

  const outputOptions = {
    file: path.join(paths.dist, build.output),
    name: 'Builder',
    format: build.format,
    banner
  }

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);

  console.log(chalk.green(`👍  ${build.output}`));
}

async function buildPlugin (plugin) {
  const distPath = path.join(paths.dist, 'plugins/');
  await mkdirp(distPath);
  
  console.log(chalk.cyan(`📦  Generating ${plugin}...`));
  const inputOptions = {
    input: path.join(paths.plugins, plugin),
    plugins: plugins.plugins
  }

  const outputOptions = {
    file: path.join(distPath, plugin),
    name: `Builder${utils.ucFirst(plugin)}Plugin`,
    format: plugins.format,
    banner
  }

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);

  console.log(chalk.green(`👍  ${plugin}`));
}

function build () {
  const plugins = fs.readdirSync(paths.plugins);
  Object.keys(builds).forEach(key => {
    buildScript(builds[key]);
  });
  plugins.forEach(plugin => {
    buildPlugin(plugin);
  });
}

build();