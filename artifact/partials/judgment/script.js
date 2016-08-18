(function(){
  /** Module */
  var judgment = angular.module('app.judgment', []);

  /** Controller */
  judgment.controller('judgmentController', [
    '$scope', '$uibModal', 'judgmentFactory',
    function($scope, $uibModal, judgmentFactory) {
      var self = this;
      self.options = {
        rowHeight: 50,
        headerHeight: 30,
        footerHeight: 50,
        scrollbarV: false,
        columnMode: 'force'
      };
      self.data = [
        { name: 'Austin', gender: 'Male' },
        { name: 'Marjan', gender: 'Male' }
      ];

      self.open = function (size) {
        $uibModal.open({
          animation: true,
          template: '<div/>',
          size: 'lg',
          windowTemplateUrl: 'partials/judgment/create/view.html',
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        })
        .result.then(function() {

        });
      };

    }
  ]);

  /** Service */
  judgment.factory('judgmentFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
