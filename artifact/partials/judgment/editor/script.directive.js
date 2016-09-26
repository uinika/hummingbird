(function() {
  angular.module('app.judgment')
    .directive('editorSelectParties', editorSelectParties);

  function editorSelectParties() {
    return {
      restrict: 'ACE',
      link: function(scope, element, attrs) {
        element.find('#courtName').editable({
          mode: 'inline',
          type: 'select',
          value: 2,
          source: [
            {value: 1, text: '被告代理人基本信息1'},
            {value: 2, text: '被告代理人基本信息2'},
            {value: 3, text: '被告代理人基本信息3'}
          ]
        });
        console.log(element);
      }
    }
  };

})();
