(function(){
  /** Module */
  var judgment = angular.module('app.judgment', []);

  /** Controller */
  judgment.controller('judgmentController', ['$scope', 'judgmentFactory',
    function($scope, judgmentFactory) {
      var judgment = this;
      judgment.options = {
        rowHeight: 50,
        headerHeight: 30,
        footerHeight: 50,
        scrollbarV: false,
        columnMode: 'force'
      };
      judgment.data = [
        { name: 'Austin', gender: 'Male' },
        { name: 'Marjan', gender: 'Male' }
      ];
    }
  ]);

  /** Service */
  judgment.factory('judgmentFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
