(function() {
  /** Module */
  var laws = angular.module('app.repository.laws', []);

  /** Controller */
  laws.controller('lawsController', ['$scope', 'lawsFactory',
    function($scope, lawsFactory) {

    }
  ]);

  /** Service */
  laws.factory('lawsFactory', [
    function() {
      return {
        'hank': 'uinika'
      }
    }
  ]);


  /** Directive */
  laws.directive('wiservChartLaws', [
    function() {
      return {
        restrict: 'ACE',
        template: "<div id='chartLaws'></div>",
        link: function(scope, element, attrs) {
          var option = {
            title: {
              text: '法条库 汇聚全国法院依法法规数据共 23,332 份，今日新增 3,000 份',
              x: 'center',
              y: 'bottom'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c}条 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['社会法', '民法', '商法', '行政法', '刑法', '经济法']
            },
            grid: {
              y:'top'
            },
            series: [{
              name: '法条库',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 635,
                name: '社会法',
                selected: true
              }, {
                value: 679,
                name: '民法'
              }, {
                value: 1048,
                name: '商法'
              }, {
                value: 958,
                name: '行政法'
              }, {
                value: 1256,
                name: '刑法'
              }, {
                value: 456,
                name: '经济法'
              }]
            }, {
              name: '司法解释',
              type: 'pie',
              radius: ['40%', '55%'],

              data: [{
                value: 335,
                name: '社会法'
              }, {
                value: 310,
                name: '民法'
              }, {
                value: 234,
                name: '商法'
              }, {
                value: 135,
                name: '行政法'
              }, {
                value: 1048,
                name: '刑法'
              }, {
                value: 251,
                name: '经济法'
              }]
            }]
          };
          echarts.init((element.find('#chartLaws'))[0]).setOption(option);
        }
      }
    }
  ]);


})();
