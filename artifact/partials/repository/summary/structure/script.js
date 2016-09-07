(function(){
  /** Module */
  var summaryStructure = angular.module('app.repository.summary.structure', []);

  /** Controller */
  summaryStructure.controller('summaryStructureController', ['$scope', 'summaryStructureFactory',
    function($scope, summaryStructureFactory) {
      // summaryStructureFactory.getSummary().then(function(result) {
      //   $scope.data = result.data.body;
      // });
    }
  ]);

  /** Service */
  summaryStructure.factory('summaryStructureFactory', ['$http', 'URL',
    function($http, URL) {
      return {
        getSummary:getSummary
      }

      // Get summary data
      function getSummary() {
        return $http.get(
          URL + '/case_brief/find/list'
        )
      }
    }
  ]);

  // Menu Tree
  summaryStructure.service('summaryStructure.menuTree', ['$http', 'URL',
    function($http, URL) {
      if (URL) {
        return $http({
          method: 'GET',
          url: URL + '/case_brief/find/list',
          withCredentials: true
        });
      } else {
        console.error('API Not Found in config.js');
      }
    }
  ]);

  /** Directive*/
  summaryStructure.directive('wiservSummaryStructure', ['summaryStructure.menuTree',
    function(menuTree) {
      return {
        restrict: 'ACE',
        link: function(scope, element, attrs) {
          menuTree.then(function(response) {
            scope.data = response.data.body;
            scope.$applyAsync(function() {
              element.metisMenu({
                preventDefault: false
              });
            });
          }, function(response) {
            console.error(response.status + response.statusText);
          });
        }
      }
    }
  ]);

})();
