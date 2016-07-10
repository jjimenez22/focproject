var hungaro = angular.module("hungaroApp", ["ui.router", "ngMaterial"]);


hungaro.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'https://foc-web-project-kperdomo.c9users.io/views/home.html',
        controller: 'LoginController'
    });
    // Application theme
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('deep-orange');
});