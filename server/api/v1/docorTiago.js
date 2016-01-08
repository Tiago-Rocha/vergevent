
function * root() {
  this.body = "Doctor Who";
}

module.exports = {
  method: 'get',
  middleware: root
}
