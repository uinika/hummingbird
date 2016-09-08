(function(){
  /** Module */
  var module = angular.module('app.repository.statistic', []);

  /** Controller */
  module.controller('statisticController', ['$scope', 'statisticFactory', '$state',
    function($scope, statisticFactory, $state) {
      var vm = this;
      vm.resultShow = false;
      // get statistics data
      statisticFactory.getStatistics().then(function(result) {
        vm.data = result.data.body;
      });

      // filter
      vm.filterBy = filterBy;

      // go to search result
      vm.search = search;

      // write input back
      vm.writeback = writeback;

      function filterBy(){
        console.log(vm.keyword);
        vm.resultShow = true;
      }

      function search() {
        $state.go("repository.repositorySearch", {keyword:$scope.keyword}, {
          reload: true
        });
      }

      function writeback(ev){
        if( !ev ) ev = window.event;
        var target = ev.target||ev.srcElement;
        vm.keyword = target.innerHTML;
        vm.resultShow = false;
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
