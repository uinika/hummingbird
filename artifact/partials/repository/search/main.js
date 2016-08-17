(function(){
  /** Module */
  var repository = angular.module('app.repository.search', []);

  /** Controller */
  repository.controller('repositorySearchController', ['$scope', 'repositorySearchFactory',
    function($scope, repositoryFactory) {
      var repository = this;
      repository.hank='uinika'
    }
  ]);

  /** Service */
  repository.factory('repositorySearchFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
