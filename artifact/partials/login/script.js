(function(){
  /** Module */
  var login = angular.module('app.login', []);

  /** Controller */
  login.controller('loginController', ['$scope', '$state', 'loginFactory',
    function($scope, $state, loginFactory) {
      var login = this;
      login.submit = function() {
        $state.go("judgment.case_list");
        console.log(login.password + login.username);
      }
    }
  ]);

  /** Service */
  login.factory('loginFactory', [
    function() {
      return {
        'hank':'uinika'
      }
    }
  ]);

})();
