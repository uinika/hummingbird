(function(){
  /** Module */
  var judgementLibSearch = angular.module('app.repository.judgementLib.search', []);

  /** Controller */
  judgementLibSearch.controller('judgementLibSearchController', ['$scope', 'judgementLibSearchFactory',
    function($scope, judgementLibSearchFactory) {

    }
  ]);

  /** Service */
  judgementLibSearch.factory('judgementLibSearchFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
