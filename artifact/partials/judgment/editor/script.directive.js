(function(){

  angular.module('app.judgment')
         .directive('wiservEditor', wiservEditor);

  wiservEditor.$inject = ['editorService'];

  function wiservEditor(editorService) {
    return {
      restrict: 'ACE',
      require: '?ngModel',
      link: link
    }

    function link(scope, element, attrs, ngModel) {
      scope.$watch(attrs.ngModel, function(input){
        editorService.Operation.autoComplete({
          keyword: input
        })
        .then(function(data) {
          if(data && data.body) {
            var suggestions = data.body;
            var temp = "";
            _.forEach(suggestions, function(suggestion) {
              temp += joinListGroupItem(suggestion);
            });
            element.next().remove();
            element.after(joinListGroup(temp));
          }
        })
      });

      function joinListGroup(content) {
        return (
          "<div id='auto-completer'><ul class='list-group'>" + content + "</ul></div>"
        );
      };

      function joinListGroupItem(content) {
        return (
          "<li class='list-group-item'>" + content + "</li>"
        );
      };

    }

  };

})();
