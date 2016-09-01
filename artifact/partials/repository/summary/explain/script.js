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

  /** Directive*/
  summaryExplain.directive('wiservSummaryExplain', [
    function() {
      return {
        restrict: 'ACE',
        link: function(scope, element, attrs) {
          element.metisMenu();
        }
      }
    }
  ]);

})();
