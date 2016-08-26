const Router = require('express').Router(),
      Util = require('../common/util.js');
/** Router definition */
Router.route('/login')
  .get(function(request, response) {
    console.log(__dirname);
    response.json(Util.json('/login/data/login.json'));
});
/** Module export */
module.exports = Router;
