(function(){
  /** Module */
  var laws = angular.module('app.repository.laws', []);

  /** Controller */
  laws.controller('lawsController', ['$scope', 'lawsFactory',
    function($scope, lawsFactory) {

    }
  ]);

  /** Service */
  laws.factory('lawsFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
