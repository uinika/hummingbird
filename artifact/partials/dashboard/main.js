/** Module */
var dashboard = angular.module('app.dashboard', []);

/** Controller */
dashboard.controller('dashboardController', ['$scope', 'dashboardFactory',
  function($scope, dashboardFactory) {
    var dashboard = this;
    dashboard.hank='uinika'
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
