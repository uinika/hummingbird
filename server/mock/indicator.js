const Router = require('express').Router(),
      Util = require('../util.js');
/** Router definition */
Router.route('/indicator')
  .get(function(request, response) {
    let protocal = Util.Protocal();
    protocal.head.status = '200';
    protocal.head.message = 'http response sucess';
    protocal.body = Util.Json('/indicator/demo.json');
    response.json(protocal);
});
/** Module export */
module.exports = Router;
