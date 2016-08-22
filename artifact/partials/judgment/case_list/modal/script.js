(function(){
  var judgment = angular.module('app.judgment');

  judgment.controller('modalController', ['$scope', 'modalFactory',
    function($scope, modalFactory) {
      var judgment = this;
    }
  ]);

  judgment.factory('modalFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
