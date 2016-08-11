/** Module */
var frame = angular.module('app.frame', []);

/** Controller */
frame.controller('frameController', ['$scope', 'frameFactory',
  function($scope, frameFactory) {
    var frame = this;
    $scope.options = {
      scrollbarV: false
    };

    $scope.data = [
      { name: 'Austin', gender: 'Male' },
      { name: 'Marjan', gender: 'Male' }
    ];
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
