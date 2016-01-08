var koa = require('koa');
var Router = require('koa-router');
var R = require('ramda');
var deepRead = require('deepRead');
var path = require('path');

function * whatever() {
  this.body = "Pemento";
}

var app = koa();
var router = new Router();
router.get("/", whatever);

var readMw = R.curry(function (servicesPath, val) {
  var mw = require(val);
  mw.path = mw.path ||
            '/' + val.replace(servicesPath, '').replace(RegExp('[.].+'),'');
  // mw.middleware = compose([prepareWs, mw.middleware]);
  return mw;
});

function addToRouter(router) {
  return function(mw) {
    router[mw.method](mw.path, mw.middleware);
  }
};

var servicesPath = path.join(__dirname, "./api/");
var apiFiles = deepRead(readMw(servicesPath), servicesPath);

R.forEach(addToRouter(router), apiFiles);

app.use(router.routes());



app.listen(3000);
