(function(){

  angular.module('app.judgment')
    .directive('wiservEditor', wiservEditor);

  function wiservEditor() {
    return {
      restrict: 'ACE',
      require: '?ngModel',
      priority : 1,
      link: link
    }

    function link(scope, element, attrs, ngModel) {
      if (!ngModel) return;
      console.log("Editor");
      var templateHTML = template();
      //
      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };
      element.on('focus', function() {
        if(element.text() == attrs.placeholder) {
          element.html("");
        }
      });
      //
      element.on('change', function() {
        scope.$evalAsync(read);
      });
      read();
      //
      function read() {
        var html = element.html();
        if (attrs.placeholder && html == '<br>' || html == ''){
          element.html(templateHTML.joinPlaceholder(attrs.placeholder));
        }
        ngModel.$setViewValue(html);
      };
      // Template HTML
      function template(){
        return {
          joinPlaceholder: function(content) {
            return (
              "<i style='color: red'>" + content + "</i>"
            );
          }
        }
      };
    }
  };

})();
