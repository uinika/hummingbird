const Koa = require('koa'),
      Static = require('koa-static'),
      App = Koa();

App.use(Static('.'));
App.listen(5002);
console.log('Server started http://localhost:5002/client/');
