'use strict';
/** Module */
var judgment = angular.module('app.judgment', []);

/** Controller */
judgment.controller('judgmentController', ['$scope', 'judgmentFactory',
  function($scope, judgmentFactory) {
    var login = this;
    login.hank='uinika'
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
