(function() {
  /** Module */
  var judgementLibSearch = angular.module('app.repository.judgementLib.search', ['mwl.calendar', 'ui.bootstrap']);

  /** Controller */
  judgementLibSearch.controller('judgementLibSearchController', ['$scope', 'judgementLibSearchFactory',
    function($scope, judgementLibSearchFactory) {
      var vm = this;
      // init
      $scope.searchParam = {};
      vm.calendarView = 'year';
      vm.viewDate = new Date();
      getDoctype();
      getCourtlevel();
      getGudgmentdate();
      searchByCondition()

      // search by condition
      vm.searchByCaseBrief = searchByCaseBrief;
      vm.searchByCourtLevel = searchByCourtLevel;
      vm.searchByDocType = searchByDocType;
      vm.searchByArea = searchByArea;

      // remove condition
      vm.removeCauseOfAction = removeCauseOfAction;
      vm.removeDoctype = removeDoctype;
      vm.removeCourtLevel = removeCourtLevel;
      vm.removeCourtPlace = removeCourtPlace;
      vm.removeJudgmentDate = removeJudgmentDate;

      // calendar view changed event
      vm.viewChangeClicked = function(nextView) {
        if (nextView === 'month') {
          return false;
        }
      };

      // calendar cell cliked event
      vm.timespanClicked = function(date) {
        var month = date.getMonth() + 1;
        month = (month.length == 2 ? month : ("0" + month));
        var year = date.getFullYear();
        $scope.searchParam.judgmentDate = year + month;
        searchByCondition();
      };

      // calendar cell format
      vm.modifyCell = function(cell) {
        var month = moment(cell.date).month() + 1;
        month = (month.length == 2 ? month : ("0" + month));
        var yearMonth = new Array(moment(cell.date).year(), month);
        yearMonth = yearMonth.join("");
        _.find(vm.gudgmentdateData, function(o) {
          if (o.yearMonth == yearMonth) {
            cell.label = cell.label + '   (' + o.verdictNum + ')';
          }
        });
      };

      vm.showProvince = function(e) {
        e.stopPropagation();
      }

      function getDoctype() {
        judgementLibSearchFactory.getDoctype().then(function(result) {
          var body = result.data.body;
          if (body) {
            vm.doctypeData = body;
          }
        })
      }

      function getCourtlevel() {
        judgementLibSearchFactory.getCourtlevel().then(function(result) {
          var body = result.data.body;
          if (body) {
            vm.courtlevelData = body;
          }
        })
      }

      function getGudgmentdate() {
        judgementLibSearchFactory.getGudgmentdate().then(function(result) {
          var body = result.data.body;
          if (body) {
            vm.gudgmentdateData = body;
          }
        })
      }

      function searchByCaseBrief(ev) {
        if (!ev) ev = window.event;
        ev.stopPropagation();
        var target = ev.target || ev.srcElement;
        vm.name = target.getAttribute('data-name');
        $scope.searchParam.causeOfAction = vm.name;
        searchByCondition();
      }

      function searchByCourtLevel(ev) {
        if (!ev) ev = window.event;
        ev.stopPropagation();
        var target = ev.target || ev.srcElement;
        vm.courtLevel = target.getAttribute('data-court-level');
        $scope.searchParam.courtLevel = vm.courtLevel;
        searchByCondition();
      }

      function searchByDocType(ev) {
        if (!ev) ev = window.event;
        ev.stopPropagation();
        var target = ev.target || ev.srcElement;
        vm.docType = target.getAttribute('data-docType');
        $scope.searchParam.docType = vm.docType;
        searchByCondition();
      }

      function searchByArea(ev) {
        if (!ev) ev = window.event;
        ev.stopPropagation();
        var target = ev.target || ev.srcElement;
        vm.courtPlace = target.getAttribute('data-court-place');
        $scope.searchParam.courtPlace = vm.courtPlace;
        searchByCondition();
      }

      function searchByCondition() {
        judgementLibSearchFactory.getByCondition($scope.searchParam).then(function(result) {
          var body = result.data.body;
          if (body) {
            vm.dataList = body;
            vm.total = result.data.head.total;
          }
        })
      }

      function removeCauseOfAction() {
        $scope.searchParam.causeOfAction = null;
        searchByCondition();
      }

      function removeDoctype() {
        $scope.searchParam.docType = null;
        searchByCondition();
      }

      function removeCourtLevel() {
        $scope.searchParam.courtLevel = null;
        searchByCondition();
      }

      function removeCourtPlace() {
        $scope.searchParam.courtPlace = null;
        searchByCondition();
      }

      function removeJudgmentDate() {
        $scope.searchParam.judgmentDate = null;
        searchByCondition();
      }
    }
  ]);

  /** Service */
  judgementLibSearch.factory('judgementLibSearchFactory', ['$http', 'URL',
    function($http, URL) {
      return {
        getDoctype: getDoctype,
        getCourtlevel: getCourtlevel,
        getGudgmentdate: getGudgmentdate,
        getByCondition: getByCondition
      }

      function getDoctype() {
        return $http.get(
          URL + '/verdict/count/by/doctype'
        )
      }

      function getCourtlevel() {
        return $http.get(
          URL + '/verdict/count/by/courtlevel'
        )
      }

      function getGudgmentdate() {
        return $http.get(
          URL + '/verdict/count/by/judgmentdate'
        )
      }

      function getByCondition(params) {
        return $http.get(
          URL + '/verdict/search/by/category', {
            params: params
          }
        )
      }
    }
  ]);

  // Menu Tree
  judgementLibSearch.service('judgementLibSearch.menuTree', ['$http', 'URL',
    function($http, URL) {
      if (URL) {
        return $http({
          method: 'GET',
          url: URL + '/verdict/count/by/casebrief',
          withCredentials: true
        });
      } else {
        console.error('API Not Found in config.js');
      }
    }
  ]);

  // map data service
  judgementLibSearch.service('judgementLibSearch.mapData', ['$http', 'URL',
    function($http, URL) {
      if (URL) {
        return $http({
          method: 'GET',
          url: URL + '/verdict/count/by/courtplace',
          withCredentials: true
        });
      } else {
        console.error('API Not Found in config.js');
      }
    }
  ]);

  /** Directive*/
  judgementLibSearch.directive('wiservLibSearch', ['judgementLibSearch.menuTree',
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

              element.bind('click', function(ev) {
                ev.stopPropagation();
              })
            });
          }, function(response) {
            console.error(response.status + response.statusText);
          });
        }
      }
    }
  ]);

  /** Directive*/
  judgementLibSearch.directive('wiservChinaMap', ['judgementLibSearch.mapData',
    function(mapData) {
      return {
        restrict: 'ACE',
        template: "<div id='chinaMap'></div>",
        link: function(scope, element, attrs) {
          mapData.then(function(response) {
            scope.provinceDataList = response.data.body;
            scope.$applyAsync(function() {
              var chart = echarts.init(document.getElementById('chinaMap'));
              chart.setOption({
                series: [{
                  type: 'map',
                  map: 'china',
                  left: 10,
                  top: 10,
                  right: 10,
                  bottom: 10,
                  selectedMode: 'single',
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

              chart.on('mapselectchanged', function(params) {
                scope.province = params.name;

                scope.provinceData = _.find(scope.provinceDataList, function(o) {
                  console.log(o);
                  return o.courtPlace.indexOf(scope.province) > -1;
                });

                console.log(scope.provinceData);
              })
            })
          })

        }
      }
    }
  ]);

})();
