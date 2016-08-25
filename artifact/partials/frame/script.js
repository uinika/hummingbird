(function(){
  /** Module */
  var module = angular.module('app.frame', []);

  module.controller('frameController', Controller);
  Controller.$inject = ['$scope', '$state'];
  function Controller($scope, $state) {
    var vm = this;
    vm.logout = function() {
      sessionStorage.removeItem("token");
      $state.go("login");
    }
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
