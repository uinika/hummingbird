(function(){
  /** Module */
  var summary = angular.module('app.repository.summary', []);

  /** Controller */
  summary.controller('summaryController', ['$scope', 'summaryFactory',
    function($scope, summaryFactory) {
    }
  ]);

  /** Service */
  summary.factory('summaryFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
