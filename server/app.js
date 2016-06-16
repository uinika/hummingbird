const Koa = require('koa'),
      Static = require('koa-static'),
      Router = require('koa-router')(),
      App = Koa();

App.use(Static('.'));
App.listen(5002);
console.log('Server started http://localhost:5002/client/');
