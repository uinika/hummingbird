const Express = require('express'),
      App = Express(),
      Cors = require('cors'),
      BodyParser = require('body-parser'),
      logMiddleware = require('./common/middleware.js'),
      Color = require('colors/safe');

/** Middleware */
App.use('/dev', Express.static('./artifact'));
App.use(Cors({
  origin: 'http://localhost:5005',
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 1728000
}));
App.use(BodyParser.json());
App.use('/', (request, response, next) => {
  logMiddleware(request, response);
  next();
});
App.listen(5005);
console.info(Color.rainbow('Server started http://localhost:5005'));

/** Basic config for express */
// App.use(Url, require('./mock/dashboard'));
// Indicator
// App.use(Url, require('./mock/indicator'));
// Statistics
// App.use(Url, require('./mock/statistics'));
