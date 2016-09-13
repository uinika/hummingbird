(function(){
  /** Module */
  var search = angular.module('app.repository.search', []);

  /** Controller */
  search.controller('repositorySearchController', ['$scope', 'repositorySearchFactory', '$stateParams',
    function($scope, repositorySearchFactory, $stateParams) {
      var vm = this;

      vm.Paging = {};
      vm.Paging.currentPage = 1;
      vm.Paging.maxSize = 5;
      vm.Paging.itemsPerPage = 10;

      repositorySearchFactory.searchByKeyword({
        keyword:$stateParams.keyword,
        type:$stateParams.type,
        pageSize: vm.Paging.itemsPerPage,
        current: vm.Paging.currentPage
      }).then(function(result) {
        vm.data = result.data.body;
      })

    }
  ]);

  /** Service */
  search.factory('repositorySearchFactory', ['$http', 'URL',
    function($http,URL) {
      return {
        searchByKeyword:searchByKeyword
      }

      function searchByKeyword(params) {
        return $http.get(
          URL + '/kb/search/find', {
            params: params
          }
        )
      }
    }
  ]);

})();
