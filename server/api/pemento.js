"use strict"; // jshint ignore:line

function* root(next) {
  this.body = "Hello Tiago";
  yield next;
}

module.exports = {
  method: 'get',
  middleware: root
};
