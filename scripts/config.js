const path = require('path');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const vue = require('rollup-plugin-vue').default;
const uglify = require('rollup-plugin-uglify').uglify;
const version = require('../package.json').version;

const plugins = [
  replace({ __VERSION__: version }),
  nodeResolve({ extensions: ['.js', '.json', '.vue'], preferBuiltins: false }),
  commonjs(),
  vue({ compileTemplate: true, css: 'dist/builder.css' }),
  buble()
];
const name = 'verte';

module.exports = {
  banner:
  `/**
  * Builder v${version}
  * (c) ${new Date().getFullYear()} Abdelrahman Ismail
  * @license MIT
  */`,
  paths: {
    input: path.join(__dirname, '../src/js/builder.js'),
    plugins: path.join(__dirname, '../src/js/plugins/'),
    src: path.join(__dirname, '../src/'),
    dist: path.join(__dirname, '../dist/')
  },
  plugins: {
    format: 'umd',
    plugins: [
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      buble()
    ]
  },
  builds: {
    umd: {
      output: `${name}.js`,
      format: 'umd',
      plugins
    },
    umdMin: {
      output: `${name}.min.js`,
      format: 'umd',
      plugins: plugins.concat([uglify()])
    },
    cjs: {
      output: `${name}.common.js`,
      format: 'cjs',
      plugins
    },
    esm: {
      output: `${name}.esm.js`,
      format: 'es',
      plugins
    }
  },
  utils: {
    ucFirst (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
