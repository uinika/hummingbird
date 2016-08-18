(function(){
  /** Module */
  var judgementLib = angular.module('app.repository.judgementLib', []);

  /** Controller */
  judgementLib.controller('judgementLibController', ['$scope', 'judgementLibFactory',
    function($scope, judgementLibFactory) {

    }
  ]);

  /** Service */
  judgementLib.factory('judgementLibFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
