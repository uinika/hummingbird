const Router = require('express').Router(),
      Util = require('../common/util.js');
/** Router definition */
// Case List
Router.route('/legal/verdict')
  .get(function(request, response) {
    response.json(Util.json('/judgment/data/case_list/legal-verdict.json'));
});
Router.route('/verdict/template')
  .get(function(request, response) {
    response.json(Util.json('/judgment/data/case_list/verdict-template.json'));
});
// Doc List
Router.route('/verdict/writ')
  .get(function(request, response) {
    response.json(Util.json('/judgment/data/doc_list/verdict-writ.json'));
});
Router.route('/verdict/writ')
  .post(function(request, response) {
    response.json(Util.json('/judgment/data/doc_list/verdict-writ.json'));
});
Router.route('/verdict/export/word')
  .post(function(request, response) {
    console.log(request.body.data);
    let protocal = Util.protocal();
    protocal.head.status = 200;
    protocal.head.message = 'http response sucess';
    response.json(protocal);
});
/** Module export */
module.exports = Router;
