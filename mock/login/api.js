const Router = require('express').Router(),
      Util = require('../common/util.js');
/** Router definition */
Router.route('/login')
  .get(function(request, response) {
    let protocal = Util.Protocal();
    protocal.head.status = '200';
    protocal.head.message = 'http response sucess';
    response.json(protocal);
});
/** Module export */
module.exports = Router;
