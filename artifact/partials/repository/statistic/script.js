(function(){
  /** Module */
  var module = angular.module('app.repository.statistic', []);

  /** Controller */
  module.controller('statisticController', ['$scope', 'statisticFactory', '$state',
    function($scope, statisticFactory, $state) {
      var model = this;
      // get statistics data
      statisticFactory.getStatistics().then(function(result) {
        model.data = result.data.body;
      });

      // filter
      $scope.filterBy = function() {
        console.log($scope.keyword);
      }

      // go to search result
      $scope.search = function() {
        $state.go("repository.repositorySearch", {keyword:$scope.keyword}, {
          reload: true
        });
      }
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
