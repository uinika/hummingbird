(function(){
  /** Module */
  var module = angular.module('app.frame', []);

  module.controller('frameController', ['$scope',
    function($scope) {
      var frame = this;
    }
  ]);

  module.directive('wiservMenu', [
    function() {
      return {
        restrict: 'ACE',
        link: function(scope, element, attrs) {
          element.metisMenu({
           preventDefault: false
         });
        }
      }
    }
  ]);

})();
