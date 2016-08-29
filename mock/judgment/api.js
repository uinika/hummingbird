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
/** Module export */
module.exports = Router;
