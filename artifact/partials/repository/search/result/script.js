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
      vm.keyword = $stateParams.keyword;

      vm.Paging.pageChanged = function() {
        searchByKeyword();
      }

      searchByKeyword();
      function searchByKeyword() {
        repositorySearchFactory.searchByKeyword({
          keyword:vm.keyword,
          type:$stateParams.type,
          pageSize: vm.Paging.itemsPerPage,
          current: vm.Paging.currentPage
        }).then(function(result) {
          if(result.data.body) {
            vm.data = result.data.body;
            vm.total = result.data.head.total;
            vm.Paging.totalItems = result.data.head.total;
          }

        })
      }


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

  search.filter("highlight", ['$sce', '$log', function($sce) {

    var fn = function(text, search) {

      if (!search) {
        return $sce.trustAsHtml(text);
      }
      text = encodeURI(text);
      search = encodeURI(search);

      var regex = new RegExp(search, 'gi')
      var result = text.replace(regex, '<span class="highlightedText">$&</span>');
      result = decodeURI(result);
      return $sce.trustAsHtml(result);
    };

    return fn;
  }]);

})();
