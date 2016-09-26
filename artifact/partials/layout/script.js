(function(){
  /** Module */
  var module = angular.module('app.layout', []);

  module.controller('layoutController', Controller);
  Controller.$inject = ['$scope', '$state'];
  function Controller($scope, $state) {
    var vm = this;
    vm.logout = function() {
      sessionStorage.removeItem("token");
      $state.go("login");
    }
  }

  module.directive('wiservSidebar', [
    function() {
      return {
        restrict: 'ACE',
        link: function(scope, element, attrs) {
          element.bind('click',function(ev) {
            ev.stopPropagation();
            $("#content-main").toggleClass('content-collapse');
            $("#sidebar").toggleClass('sidebar-collapse');
          })
          // element.sidr({
          //   name: 'sidebar',
          //   side: 'left'
          // });
        }
      }
    }
  ]);

  module.directive('wiservSideMenu', [
    function() {
      return {
        restrict: 'ACE',
        link: function(scope, element, attrs) {
          element.metisMenu({
            preventDefault: false
          });
          element.bind('click',function(ev) {
            ev.stopPropagation();
          })
          // element.sidr({
          //   name: 'sidebar',
          //   side: 'left'
          // });
        }
      }
    }
  ]);

})();
