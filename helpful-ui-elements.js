var stylus = require('stylus');
var path   = require('path');
var nodes  = stylus.nodes;
var utils  = stylus.utils;


/**
 * Returns a Stylus plugin that pulls in the library.
 *
 * @return {Function}
 */
function plugin () {
  return function (style) {
    style.include(__dirname);
  }
}

/**
 * Export the plugin.
 */
exports = module.exports = plugin;

/**
 * Export path.
 */
exports.path = __dirname;

/**
 * Library version.
 */
exports.version = require(path.join(__dirname, 'package.json')).version;
