"use strict";

function* root(next) {
  this.body = "Doctor Who";
  yield next;
}

module.exports = {
  method: 'get',
  middleware: root
};
