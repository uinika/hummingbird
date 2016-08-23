(function() {

  /** Module */
    angular
      .module('app.login', []);

  /** Controller */
  angular
      .module('app.login')
      .controller('loginController', Controller);

  Controller.$inject = ['$scope', '$state', 'loginService'];
  function Controller ($scope, $state, loginService) {
    var vm = this;
    vm.submit = function() {
      loginService.validate();
    }
  }

  /** Service */
  angular
      .module('app.login')
      .factory('loginService', Service);

  Service.$inject = ['$state'];
  function Service ($state) {
    return {
        validate: validate
    };
    /////
    function validate () {
      $state.go("judgment.case_list");
    };

  }

})();
