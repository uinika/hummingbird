(function() {

  var module = angular.module('common.http', []);

  module.constant('URL',
    'http://172.16.1.67:8080/court_decision_system'  // Test
    // 'http://localhost:5005/wiserv'  Localhost
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


  // module.provider('config', function() {
  //   this.$get = function($httpProvider) {
  //     $httpProvider.interceptors.push(['$q',
  //       function($q) {
  //         return {
  //           'request': function(config) {
  //             config.withCredentials = true;
  //             return config;
  //           },
  //           'requestError': function(rejection) {
  //             return rejection;
  //           },
  //           'response': function(response) {
  //             $q.when(response, function(result){
  //               if( response.data && typeof response.data==='object'){
  //                 if(result.data.head.status===300){
  //                   sessionStorage.message = '登录超时，请重新登录！';
  //                   window.location.href='/build';
  //                 };
  //               };
  //             });
  //             return response;
  //           },
  //           'responseError': function(rejection) {
  //             return rejection;
  //           }
  //         };
  //       }
  //     ]);
  //   }
  // });

})();
