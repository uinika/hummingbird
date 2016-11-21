(function() {

  var module = angular.module('common.http', []);

  module.constant('URL',
      'http://localhost:5005'
      // 'http://172.16.1.67:8080/' //杨东
      // 'http://172.16.7.95:8888/CourtDecisionSystem' //冉小春
      // 'http://192.168.13.77:8080/CourtDecisionSystem'
      // 'http://172.16.1.68:8080/court_decision_system'
      // location.protocol + '//' + location.host + '/CourtDecisionSystem'
  );

  module.factory('validate', [
    function(){
      return function(data, status) {
        var resolve = function(code) {
          return data && data.head && data.head.status === code
        };
        switch(status) {
          case 200:
            return (resolve(status)); break;
          case 201:
            return (resolve(status)); break;
          case 202:
            return (resolve(status)); break;
          case 400:
            return (resolve(status)); break;
          case 404:
            return (resolve(status)); break;
          case 405:
            return (resolve(status)); break;
          case 415:
            return (resolve(status)); break;
          case 500:
            return (resolve(status)); break;
        }
      };
    }
  ]);

})();
