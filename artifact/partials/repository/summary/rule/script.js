(function(){
  /** Module */
  var summaryRule = angular.module('app.repository.summary.rule', []);

  /** Controller */
  summaryRule.controller('summaryRuleController', ['$scope', 'summaryRuleFactory',
    function($scope, summaryRuleFactory) {
    }
  ]);

  /** Service */
  summaryRule.factory('summaryRuleFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
