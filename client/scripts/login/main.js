'use strict';
/** Module */
var login = angular.module('app.login', []);

/** Controller */
login.controller('loginController', ['$scope', 'loginFactory',
  function($scope, loginFactory) {
    var login = this;
    login.hank='uinika'
  }
]);

/** Service */
login.factory('loginFactory', function() {
  return {
    'hank':'uinika'
  }
});
