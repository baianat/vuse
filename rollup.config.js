const buble = require('rollup-plugin-buble');
const vue = require('rollup-plugin-vue');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const version = require('./package.json').version;

module.exports = {
  input: 'src/js/builder.js',
  name: 'Builder',
  output: {
    file: 'dist/js/builder.js',
    format: 'umd'
  },
  plugins: [
    replace({ __VERSION__: version }),
    nodeResolve({ extensions: ['.js', '.json', '.vue'] }),
    commonjs(),
    vue({ compileTemplate: true }),
    buble()
  ],
  banner:
  `/**
 * Builder v${version}
 * (c) ${new Date().getFullYear()} Abdelrahman Ismail
 * @license MIT
 */`
};
