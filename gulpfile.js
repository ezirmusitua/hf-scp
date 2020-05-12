const gulp = require('gulp');
const fs = require('fs');
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const connect = require('gulp-connect');

const rollupConfig = {
  input: './src/app.js',
  plugins: [resolve()],
}

async function _build(dist, sourcemap=false) {
  const bundle = await rollup.rollup(rollupConfig);
  await bundle.write({
    dir: dist,
    format: 'cjs',
    sourcemap: sourcemap
  });
  const indexTmpl = fs.readFileSync('./static/index.html')
    .toString()
    .replace(/\$\$\$bundleName?\$\$\$/gi, 'app.js');
  fs.writeFileSync(`${dist}/index.html`, indexTmpl);
}

module.exports.build = async function build() {
  await _build('dist', false);
}

module.exports.dev = async function dev() {
  connect.server({
    root: '.tmp-build',
    livereload: true
  });
  await _build('.tmp-build', true);
  gulp.watch(['src/**'], async () => {
    await _build('.tmp-build', true);
    connect.reload();
  });
  // connect.serverClose();
}
