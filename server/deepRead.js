"use strict"; // jshint ignore:line

let R = require('ramda');
let fs = require('fs');
let path = require('path');

let deepRead = R.curry(function (readFunction, dir) {

  function isFile(f) {
    return fs.statSync(f).isFile();
  }

  function concatToPath(f) {
    return path.join(dir,f);
  }

  // Read all files in a folder.
  let reader = R.pipe(
    fs.readdirSync,
    R.map(concatToPath),
    R.map(R.ifElse(isFile, readFunction, deepRead(readFunction))),
    R.flatten
  );

  let files = reader(dir);

  return files;
});

module.exports = deepRead;
