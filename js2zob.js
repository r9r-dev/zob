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
  .description('convert a javascript file to zob Language')
  .parse(process.argv);

var zob = program.args[0];

if (typeof (zob) === 'undefined') {
  console.log('Zob:'.bold.red + ' zobi la mouche!'.red);
} else {
  if (zob.search(".js") > 0) { // user entered a .js file
    console.log('Zob: '.bold.cyan + zob.bold.white + ' => '.yellow + zob.replace('.js', '.zob').bold.white);
    var text = fs.readFileSync(zob).toString(); // the contents of the file
    convertCode(text);
  } else { // user entered something apart from a js file
    console.log('Zob:'.bold.red + ' you must specify a .js file.'.red);
  }
}

function convertCode(text) {
  var outputFileName = zob.replace(".js", ".zob");
  var zobText = text;

  for (i = 0; i < legend.length; i++) {
    var query = legend[i];
    //var re = new RegExp(query.regex, 'g');

    zobText = zobText.replaceAll(query.search, query.replace);
  }

  fs.writeFileSync(outputFileName, zobText);
}