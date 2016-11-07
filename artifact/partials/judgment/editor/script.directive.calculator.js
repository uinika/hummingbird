(function(){

  angular.module('app.judgment')
    .directive('wiservSmartCalculator', wiservSmartCalculator);

  function wiservSmartCalculator() {
    return {
      restrict: 'ACE',
      require: '?ngModel',
      priority : 3,
      link: link
    }
    function link(scope, element, attrs, ngModel) {
      console.log("Calculator");
      scope.$evalAsync(function(){

      });
    }
  }

})();
