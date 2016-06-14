const Koa = require('koa'),
      Static = require('koa-static'),
      App = Koa();

App.use(Static('.'));
App.listen(5002);
