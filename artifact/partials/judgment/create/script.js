(function(){
  /** Module */
  var judgmentCreate = angular.module('app.judgment.create', []);

  /** Controller */
  judgmentCreate.controller('judgmentCreateController', ['$scope', 'judgmentCreateFactory',
    function($scope, judgmentFactory) {
      var judgmentCreate = this;
    }
  ]);

  /** Service */
  judgmentCreate.factory('judgmentCreateFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
