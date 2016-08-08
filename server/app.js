const Express = require('express'),
      App = Express(),
      Cors = require('cors'),
      BodyParser = require('body-parser'),
      Color = require('colors/safe'),
      Common = require('./common/golbal.js'),
      Url = '/';

/** Middleware */
App.use('/client', Express.static('./client'));
App.use(Cors({
  origin: 'http://localhost:6000',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 1728000
}));
App.use(BodyParser.json());
App.use('/', function (request, response, next) {
  Common.Log(request, response);
  next();
});
App.listen(6000);
console.info(Color.rainbow('Server started http://localhost:6000') + Url);

/** Basic config for express */
// App.use(Url, require('./mock/dashboard'));
// Indicator
// App.use(Url, require('./mock/indicator'));
// Statistics
// App.use(Url, require('./mock/statistics'));
