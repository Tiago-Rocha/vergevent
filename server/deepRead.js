var R = require('ramda');
var fs = require('fs');
var path = require('path');

var deepRead = R.curry(function (readFunction, dir) {

  function isFile(f) {
    return fs.statSync(f).isFile();
  }

  function concatToPath(f) {
    return path.join(dir,f);
  }

  // Read all files in a folder.
  var reader = R.pipe(
    fs.readdirSync,
    R.map(concatToPath),
    R.map(R.ifElse(isFile, readFunction, deepRead(readFunction))),
    R.flatten
  );

  var files = reader(dir);

  return files;
});

module.exports = deepRead;
