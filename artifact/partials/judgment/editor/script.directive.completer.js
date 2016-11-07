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
      console.log("Completer");
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
            var suggestions = data.body;
            var temp = "";
            _.forEach(suggestions, function(suggestion) {
              temp += templateHTML.joinListGroupItem(suggestion);
            });
            element.siblings().filter("#wiserv-editor").remove();
            element.after(templateHTML.joinListGroup(temp));
            return element;
          }
        })
        .then(function(element){
          var jqEditor = element.siblings().filter("#wiserv-editor");
          var jqListGroupItem = jqEditor.find(".list-group-item");
          jqListGroupItem.first().toggleClass("active");
          jqListGroupItem.mouseover(function(){
            jqListGroupItem.removeClass("active");
            $(this).toggleClass("active");
          });
          return element;
        })
        .then(function(element){
          // var jqEditor = element.siblings().filter("#wiserv-editor");
          // var jqListGroupItem = jqEditor.find(".list-group-item");
          // element.keydown(function(event){
          //   var html = element.html();
          //   switch(event.keyCode) {
          //     case 13: element.html() = 'TEST'; break;
          //   }
          // });
          return element;
        })
        .then(function(element){
          var jqEditor = element.siblings().filter("#wiserv-editor");
          var jqListGroupItem = jqEditor.find(".list-group-item");
          jqListGroupItem.click(function(event){
            var selectedText = event.target.innerText;
            var originText = element.html();
            var targetText = originText += selectedText;
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
