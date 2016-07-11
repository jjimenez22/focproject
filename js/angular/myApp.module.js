var hungaro = angular.module("hungaroApp", ["ui.router", "ngMaterial", 'md.data.table', 'lfNgMdFileInput']);


hungaro.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'https://hungaro-project-kperdomo.c9users.io/templates/home.html',
        controller: 'HomeController'
    });
    // Application theme
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue')
});

hungaro.config(["$locationProvider", function($locationProvider) {
  // This will remove the pound (#) from routes for html supporting browsers
  $locationProvider.html5Mode(true);
}]);