/**
 * Module dependencies.
 */
var expect = require('chai').expect;
var stylus = require('stylus');
var glob = require('glob');
var fs = require('fs');
var ui = require('../');

/**
 * Ensure that the plugin loads correctly.
 */
// describe('plugin', function () {
//
//   it('loads without failure', function () {
//     expect(ui).to.be.a('function');
//   });
//
// });

/**
 * Find all of our test cases and remove the `.styl` extension.
 */
var cases = glob.sync('**/*.styl', {cwd: 'test/cases/'}).map(function (file) {
  return file.replace('.styl', '');
});

/*
 * For each `.styl` and `.css` pair in `test/cases`, compile stylus to css
 * and compare actual result to expected css.
 */
describe('compilation', function () {

  cases.forEach(function (test) {
    var name = test.replace('test/cases/', '');

    it(name, function (done) {
      var path = 'test/cases/' + test + '.styl';
      var styl = fs.readFileSync(path, 'utf8').replace(/\r/g, '');
      var css = fs.readFileSync('test/cases/' + test + '.css', 'utf8').replace(/\r/g, '').trim();

      // get stylus ready to render our test
      var style = stylus(styl)
        .use(ui())
        .set('filename', path)
        .define('url', stylus.url());

      // if the case has "compress" in the file name, then compress the output
      if (~test.indexOf('compress')) style.set('compress', true);

      // render the stylus file and assert that it matches the CSS file
      style.render(function (err, actual) {
        if (err) throw err;
        expect(actual.trim()).to.equal(css);
        done();
      });
    });
  });

});
