const Koa = require('koa'),
      Static = require('koa-static'),
      App = Koa();

App.use(Static('client'));
App.listen(5002);
