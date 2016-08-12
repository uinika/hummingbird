/** Module */
var repository = angular.module('app.repository', []);

/** Controller */
repository.controller('repositoryController', ['$scope', 'repositoryFactory',
  function($scope, repositoryFactory) {
    var repository = this;
    repository.hank='uinika'
  }
]);

/** Service */
repository.factory('repositoryFactory', [
  function() {
    return {
      'hank':'uinika'
    }
  }
]);
