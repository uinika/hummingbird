(function(){
  /** Module */
  var module = angular.module('app.repository.statistic', []);

  /** Controller */
  module.controller('statisticController', ['$scope', 'statisticFactory',
    function($scope, statisticFactory) {
      var repository = this;
      repository.hank='uinika'
    }
  ]);

  /** Service */
  module.factory('statisticFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);


})();
