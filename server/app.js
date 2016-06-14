const Koa = require('koa'),
      Static = require('koa-static'),
      App = Koa();

App.use(Static('.'));
App.listen(5002);
console.log('HTTP Server listen on port 5002');
