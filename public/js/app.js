var app = angular.module('DemoApp', 
[
    'ngAnimate',
    'ui.router',
    'ngCookies',
    'ui.bootstrap'
]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('login', {
          url: '/login',
          controller: 'LoginController',
          controllerAs: 'vm',
          templateUrl: 'templates/login.html'
      })
      .state('assets', {
          url: '/assets',
          controller: 'AssetListController',
          controllerAs: 'vm',
          templateUrl: 'templates/assets/Asset-List.html'
      });

    $urlRouterProvider.otherwise('/assets');
    $locationProvider.html5Mode({
      enabled: true
    });

})
.run(function($rootScope, $window, $location, $templateCache) {

});

