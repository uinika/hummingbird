'use strict';
/** Module */
var repository = angular.module('app.repository', []);

/** Controller */
repository.controller('repositoryController', ['$scope', 'repositoryFactory',
  function($scope, repositoryFactory) {
    var login = this;
    login.hank='uinika'
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
