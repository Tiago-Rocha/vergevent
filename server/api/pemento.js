
function * root() {
  this.body = "Hello Tiago";
}

module.exports = {
  method: 'get',
  middleware: root
}
