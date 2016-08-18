(function(){
  /** Module */
  var summaryExplain = angular.module('app.repository.summary.explain', []);

  /** Controller */
  summaryExplain.controller('summaryExplainController', ['$scope', 'summaryExplainFactory',
    function($scope, summaryExplainFactory) {
    }
  ]);

  /** Service */
  summaryExplain.factory('summaryExplainFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
