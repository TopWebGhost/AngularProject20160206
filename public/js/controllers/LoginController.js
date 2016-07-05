'use strict';
app.controller('LoginController', [
    '$scope',
    '$rootScope',
    'AuthService',
    '$state',
    function ($scope, $rootScope, AuthService, $state) {
        var vm = this;
        vm.email = "mrashidbd2000@gmail.com";
        vm.password = 123;
        vm.invalidLogin = false;

        //Force logout if session exists
        $rootScope.$broadcast('logOut', true);

        vm.doLogin = function (ev) {
            var params = {
                email: this.email,
                password: this.password
            };

            AuthService.login(params)
              .then(function(userInfo) {
                  if (userInfo.loggedIn) {
                      vm.invalidLogin = false;
                      $state.go('assets');
                  } else {
                      vm.invalidLogin = userInfo.loginError;
                  }
              })
              .catch (function() {
                  console.log('Error in login request.');
            });
        }

    }]
);