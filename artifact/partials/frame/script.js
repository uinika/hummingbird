(function(){
  /** Module */
  var module = angular.module('app.frame', []);

  module.controller('frameController', Controller);
  Controller.$inject = ['$scope'];
  function Controller(dependencies) {
    var vm = this;

  }

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
