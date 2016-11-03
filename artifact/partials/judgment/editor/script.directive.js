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
      element.focus(function(){
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
              $("#wiserv-editor").remove();
              element.after(joinListGroup(temp));
              return $("#wiserv-editor");
            }
          })
          .then(function(jqEditor){
            var jqListGroupItem = jqEditor.find(".list-group-item");
            jqListGroupItem.first().toggleClass("active");
            jqListGroupItem.mouseover(function(){
              jqListGroupItem.removeClass("active");
              $(this).toggleClass("active");
            });
            return jqListGroupItem;
          })
          .then(function(jqListGroupItem){
            jqListGroupItem.click(function(event){
              console.log(ngModel);
              scope.$evalAsync(function() {
                ngModel.$setViewValue(input + event.target.innerText);
              });
              scope[attrs.ngModel] = input + event.target.innerText;
            })
          })
        });
      });

      element.blur(function() {
        $("#wiserv-editor").remove();
      });

      function joinListGroup(content) {
        return (
          "<div id='wiserv-editor'><ul class='list-group'>" + content + "</ul></div>"
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
