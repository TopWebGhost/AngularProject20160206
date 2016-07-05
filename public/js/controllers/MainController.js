'use strict';
app.controller('MainCtrl', [
    '$scope',
    '$rootScope',
    'AuthService',
    '$state',
    function ($scope, $rootScope, AuthService, $state) {
        var vm = this;
        vm.currentUser = null;

        $rootScope.formats = ['yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];


        $rootScope.$watch(
            "currentUser",
            function sessionChange (newValue) {
                vm.currentUser = newValue;
            }
        );

        $rootScope.$on("logOut",
            function sessionEnd (ev, force) {
                if (force && AuthService.isLoggedIn()) {
                    vm.logout();
                }
            }
        );

        if (!AuthService.isLoggedIn()) {
            AuthService.validateSession().then(function(loggedIn){
                if (!loggedIn) {
                    $state.go('login');
                } else {
                    console.log('Session validated');
                }
            });
        }

        vm.logout = function () {
            AuthService.logout().then(function(resp){
                if (resp.done) {
                    $state.go('login');
                } else {
                    console.log('logout failed');
                }
            });
        };

    }]
);