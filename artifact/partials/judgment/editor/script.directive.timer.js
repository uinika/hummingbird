(function () {

  angular.module('app.judgment')
    .directive('wiservTimer', wiservTimer);

  wiservTimer.$inject = ['$interval', 'dateFilter']

  function wiservTimer($interval, dateFilter) {
    return {
      restrict: 'ACE',
      link: link
    }

    function link(scope, element, attrs) {
      var format,
        timeoutId;

      function updateTime() {
        element.val(dateFilter(new Date(), "M月d日-h:mm:ss 自动保存"));
      }

      scope.$watch(attrs.myCurrentTime, function (value) {
        format = value;
        updateTime();
      });

      element.on('$destroy', function () {
        $interval.cancel(timeoutId);
      });

      // start the UI update process; save the timeoutId for canceling
      timeoutId = $interval(function () {
        updateTime(); // update DOM
      }, 1000);
    }
  }

})();