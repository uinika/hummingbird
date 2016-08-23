(function(){
  /** Module */
  var judgment = angular.module('app.judgment');

  /** Controller */
  judgment.controller('judgmentController', [
    '$scope', '$uibModal', 'judgmentFactory', "NgTableParams",
    function($scope, $uibModal, judgmentFactory, NgTableParams) {
      var self = this;

      var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50}];
      self.tableParams = new NgTableParams({}, { dataset: data});

      self.open = function() {
        $uibModal.open({
          animation: true,
          template: '<div/>',
          size: 'lg',
          windowTemplateUrl: 'partials/judgment/case_list/modal/view.html',
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
