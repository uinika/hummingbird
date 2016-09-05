(function(){
  /** Module */
  var search = angular.module('app.repository.search', []);

  /** Controller */
  search.controller('repositorySearchController', ['$scope', 'repositorySearchFactory', '$stateParams',
    function($scope, repositorySearchFactory, $stateParams) {
      console.log($stateParams.keyword);
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
