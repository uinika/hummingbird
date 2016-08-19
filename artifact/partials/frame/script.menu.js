(function(){
  angular.module('app.frame')
  .directive('wiservMenu', [
    function() {
      return {
        restrict: 'ACE',
        link: function(scope, element, attrs) {
          console.log(element);
          element.metisMenu({
           preventDefault: false
         });
        }
      }
    }
  ]);

})();
