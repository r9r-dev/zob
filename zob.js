#!/usr/bin/env node

/**
 * Module dependencies.
 */

String.prototype.replaceAll = function (substring, replacement) {
  var result = '';
  var lastIndex = 0;

  while (true) {
    var index = this.indexOf(substring, lastIndex);
    if (index === -1) break;
    result += this.substring(lastIndex, index) + replacement;
    lastIndex = index + substring.length;
  }

  return result + this.substring(lastIndex);
};

var program = require('commander'),
  pkginfo = require('pkginfo')(module, 'version'),
  colors = require("colors"),
  fs = require('fs');

var legend = require('./legend'); // ./ means current directory, and don't need .js b/c all require files are js

program
  .version(module.exports.version, '-v, --version')
  .description('run a zob script')
  .parse(process.argv);

var zob = program.args[0];

if (typeof (zob) === 'undefined') {
  console.log('Zob:'.bold.red + ' zobi la mouche!'.red);
} else {
  if (zob.search(".zob") > 0) { // user entered a .zob file
    console.log('Zob: '.bold.cyan + '\\-> '.white + zob.white);
    var text = fs.readFileSync(zob).toString(); // the contents of the file
    convertCode(text);
  } else { // user entered something apart from a zob file
    console.log('Zob:'.bold.red + ' you must specify a .zob file.'.red);
  }
}

function convertCode(text) {
  var zobText = text;

  for (i = (legend.length - 1); i >= 0; i--) {
    var query = legend[i];

    zobText = zobText.replaceAll(query.replace, query.search);
  } 

  eval(zobText);
}