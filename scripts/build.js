const Rollup = require('rollup');
const Uglify = require('uglify-js');
const fs = require('fs');
const path = require('path');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const vue = require('rollup-plugin-vue');
const version = require('../package.json').version;

const outputPath = path.join(__dirname, '/../', 'dist');

// build main plugin
async function main () {
  const bundle = await Rollup.rollup({
    input: 'src/js/builder.js',
    plugins: [
      replace({ __VERSION__: version }),
      nodeResolve({ extensions: ['.js', '.json', '.vue'], preferBuiltins: false }),
      commonjs(),
      vue({ compileTemplate: true, css: 'dist/builder.css' }),
      buble()
    ]
  });

  const { code } = await bundle.generate({
    format: 'umd',
    name: 'Builder',
    banner:
`/**
* Builder v${version}
* (c) ${new Date().getFullYear()} Abdelrahman Ismail
* @license MIT
*/`
  });

  const output = path.join(outputPath, 'builder.js');
  fs.writeFileSync(output, code);
  fs.writeFileSync(path.join(outputPath, 'builder.min.js'), Uglify.minify(code, {
    compress: true,
    mangle: true,
  }).code);  
}

async function plugins () {
  const bundle = await Rollup.rollup({
    input: 'src/js/plugins/pwa.js',
    plugins: [
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      buble()
    ]
  });

  const { code } = await bundle.generate({
    format: 'umd',
    name: 'BuilderPWAPlugin',
    banner:
`/**
 * Builder v${version}
 * (c) ${new Date().getFullYear()} Abdelrahman Ismail
 * @license MIT
 */`
  });

  fs.writeFileSync(path.join(outputPath, 'plugins/pwa.js'), Uglify.minify(code, {
    compress: true,
    mangle: true,
  }).code);
}

main();
plugins();
