"use strict"; // jshint ignore:line


let koa = require('koa');
let Router = require('koa-router');
let R = require('ramda');
let deepRead = require('deepRead');
let path = require('path');

function* Whatever(next) {
  this.body = "Pemento";
  yield next;
}

let app = koa();
let router = new Router();
router.get("/", Whatever);

let readMw = R.curry(function (servicesPath, val) {
  let mw = require(val);
  mw.path = mw.path ||
            '/' + val.replace(servicesPath, '').replace(new RegExp('[.].+'),'');
  // mw.middleware = compose([prepareWs, mw.middleware]);
  return mw;
});

function addToRouter(router) {
  return function(mw) {
    router[mw.method](mw.path, mw.middleware);
  };
}

let servicesPath = path.join(__dirname, "./api/");
let apiFiles = deepRead(readMw(servicesPath), servicesPath);

R.forEach(addToRouter(router), apiFiles);

app.use(router.routes());



app.listen(3000);
