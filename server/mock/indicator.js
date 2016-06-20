const Router = require('express').Router(),
      Util = require('../util.js');
/** Router definition */
Router.route('/indicator')
  .get(function(request, response) {
    response.json("indicator");
});
/** Module export */
module.exports = Router;
