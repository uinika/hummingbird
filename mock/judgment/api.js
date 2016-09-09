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
// Editor
// Match
Router.route('/verdict/fact/result')
  .post(function(request, response) {
    response.json(Util.json('/judgment/data/editor/verdict-fact-result.json'));
});
Router.route('/verdict/reason')
  .post(function(request, response) {
    response.json(Util.json('/judgment/data/editor/verdict-reason.json'));
});
Router.route('/verdict/case/main')
  .post(function(request, response) {
    response.json(Util.json('/judgment/data/editor/verdict-case-main.json'));
});
// Low Item
Router.route('/case/brief/find/laws')
  .get(function(request, response) {
    response.json(Util.json('/judgment/data/editor/case-brief-find-laws.json'));
});
// Similar Case
Router.route('/case/similar/verdict')
  .post(function(request, response) {
    response.json(Util.json('/judgment/data/editor/case-similar-verdict.json'));
});
/** Module export */
module.exports = Router;
