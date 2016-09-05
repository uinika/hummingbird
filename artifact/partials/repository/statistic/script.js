(function(){
  /** Module */
  var module = angular.module('app.repository.statistic', []);

  /** Controller */
  module.controller('statisticController', ['$scope', 'statisticFactory',
    function($scope, statisticFactory) {
      var model = this;
      statisticFactory.getStatistics().then(function(result) {
        model.data = result.data.body;
      })
    }
  ]);

  /** Service */
  module.factory('statisticFactory', ['$http', 'URL',
    function($http,URL) {
      return {
        getStatistics: getStatistics
      }
      // Get Statistics data
      function getStatistics () {
        return $http.get(
          URL + '/verdict/writ'
        )
      }
    }
  ]);


})();
