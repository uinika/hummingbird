(function(){

  angular.module('app.judgment')
         .directive('wiservEditor', wiservEditor);

  function wiservEditor() {
    return {
      restrict: 'ACE',
      require: '?ngModel',
      link: link
    }

    function link(scope, element, attrs, ngModel) {
      element.after(
        "<div id='auto-completer'>"+
          "<ul class='list-group'>" +
            "<li class='list-group-item'>TEST</li>" +
            "<li class='list-group-item'>TEST</li>" +
          "</ul>" +
        "</div>"
      );

    }

  };

})();
