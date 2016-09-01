(function() {
    /** Module */
    var judgementLibSearch = angular.module('app.repository.judgementLib.search', []);

    /** Controller */
    judgementLibSearch.controller('judgementLibSearchController', ['$scope', 'judgementLibSearchFactory',
      function($scope, judgementLibSearchFactory) {
        $scope.showProvince = function(e){
          e.stopPropagation();
        }
      }
    ]);

    /** Service */
    judgementLibSearch.factory('judgementLibSearchFactory', [
      function() {
        return {
          'hank': 'uinika'
        }
      }
    ]);

    /** Directive*/
    judgementLibSearch.directive('wiservChinaMap', [
        function() {
          return {
            restrict: 'ACE',
            template: "<div id='chinaMap'></div>",
            link: function(scope, element, attrs) {
              var chart = echarts.init(document.getElementById('chinaMap'));
              chart.setOption({
                  series: [{
                      type: 'map',
                      map: 'china',
                      label: {
                        normal: {
                          show: true
                        },
                        emphasis: {
                          show: true
                        }
                      },
                      itemStyle: {
                        normal: {
                          areaColor: '#f5f3f0',
                          borderColor: '#7b7b7b',
                          borderType: 'solid',
                        }
                      }
                      }]
                  });
              }
            }
          }
        ]);

    })();
