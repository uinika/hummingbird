(function(){
  /** Module */
  var frame = angular.module('app.frame', []);

  /** Controller */
  frame.controller('frameController', ['$scope', 'frameFactory',
    function($scope, frameFactory) {
      var frame = this;
    }
  ]);

  /** Service */
  frame.factory('frameFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
