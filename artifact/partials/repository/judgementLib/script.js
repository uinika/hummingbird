(function(){
  /** Module */
  var judgementLib = angular.module('app.repository.judgementLib', []);

  /** Controller */
  judgementLib.controller('judgementLibController', ['$scope', 'judgementLibFactory',
    function($scope, judgementLibFactory) {

    }
  ]);

  /** Service */
  judgementLib.factory('judgementLibFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

  /** Directive */
  judgementLib.directive('wiservChartJudgement', [
    function() {
      return {
        restrict: 'ACE',
        template: "<div id='chartJudgement'></div>",
        link: function(scope, element, attrs) {
          var option = {
            color: [
               '#91c7ae', '#d48265', '#ffb980', '#61a0a8',
              '#397b29'
            ],
            title: {
              text: '裁判文书库 汇聚全国法院依法公开案例数据共 20,000份，今日新增 1,00 份',
              x: 'center',
              y: 'bottom',
              padding:[30,5,5,5]
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}例 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['行政案件', '刑事案件', '民事案件', '赔偿案件']
            },
            series: [{
              name: '裁判文书库',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [{
                value: 335,
                name: '行政案件'
              }, {
                value: 310,
                name: '刑事案件'
              }, {
                value: 234,
                name: '民事案件'
              }, {
                value: 135,
                name: '赔偿案件'
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

          echarts.init((element.find('#chartJudgement'))[0]).setOption(option);
        }
      }
    }
  ]);

})();
