(function(){
  /** Module */
  var search = angular.module('app.repository.search', []);

  /** Controller */
  search.controller('repositorySearchController', ['$scope', 'repositorySearchFactory',
    function($scope, repositorySearchFactory) {
    }
  ]);

  /** Service */
  search.factory('repositorySearchFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
