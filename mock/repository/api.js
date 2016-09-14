const Router = require('express').Router(),
      Util = require('../common/util.js');
/** Router definition */
Router.route('/case_brief/find/list')
  .get(function(request, response) {
    response.json(Util.json('/repository/data/summaryStructure.json'));
});
Router.route('/kb/search/find')
  .get(function(request, response) {
    response.json(Util.json('/repository/data/result.json'));
});
Router.route('/case_brief/find/explain')
  .get(function(request, response) {
    response.json(Util.json('/repository/data/explain.json'));
});
/** Module export */
module.exports = Router;
