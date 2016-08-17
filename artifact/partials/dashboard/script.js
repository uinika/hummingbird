(function(){
  /** Module */
  var dashboard = angular.module('app.dashboard', []);

  /** Controller */
  dashboard.controller('dashboardController', ['$scope', 'dashboardFactory',
    function($scope, dashboardFactory) {
      var dashboard = this;

    }
  ]);

  /** Service */
  dashboard.factory('dashboardFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
