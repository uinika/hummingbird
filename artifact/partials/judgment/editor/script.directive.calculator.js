(function(){

  angular.module('app.judgment')
    .directive('wiservSmartCalculator', wiservSmartCalculator);

  // wiservSmartCalculator.$inject = ['$apply'];

  function wiservSmartCalculator() {
    return {
      restrict: 'ACE',
      require: '?ngModel',
      priority : 3,
      link: link
    }
    function link(scope, element, attrs, ngModel) {
      scope.$evalAsync(function(){
        
      });
    }
  }

})();
