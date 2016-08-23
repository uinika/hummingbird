(function() {
  /** Module */
  var summary = angular.module('app.repository.summary', []);

  /** Controller */
  summary.controller('summaryController', ['$scope', 'summaryFactory',
    function($scope, summaryFactory) {}
  ]);

  /** Service */
  summary.factory('summaryFactory', [
    function() {
      return {
        'hank': 'uinika'
      }
    }
  ]);

  /** Directive */
  summary.directive('wiservChartSummary', [
    function() {
      return {
        restrict: 'ACE',
        template: "<div id='chartSummary'></div>",
        link: function(scope, element, attrs) {
          var option = {
            color: [
               '#91c7ae', '#d48265', '#ffb980', '#61a0a8',
              '#397b29'
            ],
            title: {
              text: '案由库 汇聚全国法院依法公开案例数据共 50,000 份，今日新增 3,000 份',
              x: 'center',
              y: 'bottom',
              padding:[30,5,5,5]
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}条 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['行政案由', '刑事案由', '民事案由', '赔偿案由']
            },
            series: [{
              name: '案由库',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{
                value: 335,
                name: '行政案由'
              }, {
                value: 310,
                name: '刑事案由'
              }, {
                value: 234,
                name: '民事案由'
              }, {
                value: 135,
                name: '赔偿案由'
              }],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          };

          echarts.init((element.find('#chartSummary'))[0]).setOption(option);
        }
      }
    }
  ]);


})();
