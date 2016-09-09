(function() {
  /** Module */
  var module = angular.module('app.repository.statistic', []);

  /** Controller */
  module.controller('statisticController', ['$scope', 'statisticFactory', '$state',
    function($scope, statisticFactory, $state) {
      var vm = this;
      vm.resultShow = false;
      // get statistics data
      statisticFactory.getStatistics().then(function(result) {
        vm.data = result.data.body[0];
      });

      statisticFactory.getStatisticsToday().then(function(result) {
        vm.today = result.data.body[0];
      });
      // filter
      vm.filterBy = filterBy;

      // go to search result
      vm.search = search;

      // write input back
      vm.writeback = writeback;

      function filterBy() {
        console.log(vm.keyword);
        vm.resultShow = true;
        statisticFactory.filterBy({
          keyword: vm.keyword
        }).then(function(result) {
          vm.suggest = result.data.body;
        });
      }

      function search() {
        $state.go("repository.repositorySearch", {
          keyword: vm.keyword,
          type: vm.type
        }, {
          reload: true
        });
      }

      function writeback(ev) {
        if (!ev) ev = window.event;
        var target = ev.target || ev.srcElement;
        var type = target.getAttribute('data-type');
        switch (type) {
          case '案由':
            vm.type = 'an_you';
            break;
          case '裁判文书':
            vm.type = 'wen_shu';
            break;
          case '法条':
            vm.type = 'fa_tiao';
            break;
          default:
            vm.type = 'wen_shu';
            break;
        }
        vm.keyword = target.innerHTML;
        vm.resultShow = false;
      }
    }
  ]);

  /** Service */
  module.factory('statisticFactory', ['$http', 'URL',
    function($http, URL) {
      return {
        getStatistics: getStatistics,
        getStatisticsToday: getStatisticsToday,
        filterBy: filterBy
      }
      // Get Statistics data
      function getStatistics() {
        return $http.get(
          URL + '/kb/search/all'
        )
      }

      function getStatisticsToday() {
        return $http.get(
          URL + '/kb/search/add_today'
        )
      }

      function filterBy(params) {
        return $http.get(
          URL + '/keyword/auto/fill', {
            params: params
          }
        )
      }
    }
  ]);


})();
