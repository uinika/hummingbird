(function(){
  /** Module */
  var summaryStructure = angular.module('app.repository.summary.structure', []);

  /** Controller */
  summaryStructure.controller('summaryStructureController', ['$scope', 'summaryStructureFactory',
    function($scope, summaryStructureFactory) {
    }
  ]);

  /** Service */
  summaryStructure.factory('summaryStructureFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

  /** Directive*/
  summaryStructure.directive('wiservSummaryStructure', [
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
