(function(){
  /** Module */
  var repository = angular.module('app.repository', []);

  /** Controller */
  repository.controller('repositoryController', ['$scope', 'repositoryFactory',
    function($scope, repositoryFactory) {
      var repository = this;
      repository.hank='uinika'
    }
  ]);

  /** Service */
  repository.factory('repositoryFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

  /** Directive */
  repository.directive('myChartItem',[
    function() {
      return {
        restrict: 'ACE',
        template: "<div id='item' style='width:300;height:155px;position:relative;top:-8px'></div>",
        link: function( scope, element, attrs ) {
          console.log((element.find('div')));
          var option = {
            title : {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          echarts.init((element.find('#item'))[0]).setOption(option);
        }
      }
    }
  ]);

})();
