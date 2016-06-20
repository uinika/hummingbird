const Router = require('express').Router(),
      Util = require('../util.js');
/** Router definition */
Router.route('/statistics')
  .get(function(request, response) {
    response.json("statistics");
});
/** Module export */
module.exports = Router;
