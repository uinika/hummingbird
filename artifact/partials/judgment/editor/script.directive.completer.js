(function(){

  angular.module('app.judgment')
    .directive('wiservAutoCompleter', wiservAutoCompleter);

  wiservAutoCompleter.$inject = ['editorService'];

  function wiservAutoCompleter(editorService) {
    return {
      restrict: 'ACE',
      require: '?ngModel',
      priority : 2,
      link: link
    }
    function link(scope, element, attrs, ngModel) {
      if (!ngModel) return;
      var templateHTML = template();
      //
      element.on('keyup change', function() {
        scope.$evalAsync(read);
      });
      element.on('focus', function() {
        $("#wiserv-editor").remove();
      });
      //
      function read() {
        // var html = element.html();
        // ngModel.$setViewValue(html);
        editorService.Operation.autoComplete({
          keyword: element.text()
        })
        .then(function(data) {
          if(data && data.body) {
            var suggestions = data.body[0];
            var keyword = suggestions.keyword;
            var result = suggestions.result;
            var temp = "";
            _.forEach(result, function(result) {
              temp += templateHTML.joinListGroupItem(result);
            });
            element.siblings().filter("#wiserv-editor").remove();
            element.after(templateHTML.joinListGroup(temp));
            return {
              suggestions: suggestions,
              element: element
            };
          }
        })
        .then(function(target){
          var jqEditor = target.element.siblings().filter("#wiserv-editor");
          var jqListGroupItem = jqEditor.find(".list-group-item");
          jqListGroupItem.first().toggleClass("active");
          jqListGroupItem.mouseover(function(){
            jqListGroupItem.removeClass("active");
            $(this).toggleClass("active");
          });
          return target;
        })
        .then(function(target){
          // var jqEditor = element.siblings().filter("#wiserv-editor");
          // var jqListGroupItem = jqEditor.find(".list-group-item");
          // element.keydown(function(event){
          //   var html = element.html();
          //   switch(event.keyCode) {
          //     case 13: element.html() = 'TEST'; break;
          //   }
          // });
          return target;
        })
        .then(function(target){
          var jqEditor = target.element.siblings().filter("#wiserv-editor");
          var jqListGroupItem = jqEditor.find(".list-group-item");
          jqListGroupItem.click(function(event){
            var selectedText = event.target.innerText;
            var originText = element.html();
            var resultText = _.replace(selectedText, target.suggestions.keyword, '');
            var targetText = originText += resultText;
            element.html(targetText);
            ngModel.$setViewValue(targetText);
            jqEditor.remove();
          });
          return element;
        })
      };
      // Template HTML
      function template(){
        return {
          joinListGroup: function(content) {
            return (
              "<div id='wiserv-editor'><ul class='list-group'>" + content + "</ul></div>"
            );
          },
          joinListGroupItem: function(content) {
            return (
              "<li class='list-group-item'>" + content + "</li>"
            );
          }
        }
      };

    }
  };

})();
