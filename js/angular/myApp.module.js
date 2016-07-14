var hungaro = angular.module("hungaroApp", ["ui.router", "ngMaterial", 'md.data.table', 'lfNgMdFileInput']);


hungaro.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    })
    .state('go', {
      url: '/go-hung',
      templateUrl: 'templates/go-hungarian.html',
      controller: 'HungarianController'
    });
    // Application theme
    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue')
});

hungaro.run(['$rootScope', '$location','$state', function ($rootScope, $location, $state) {
        $rootScope.$on("$locationChangeStart", function(e, toState, toParams, fromState, fromParams) {

        if ($location.url() == "/go-hung") {
          if ($rootScope.rows.length < $rootScope.dimension) {
            e.preventDefault();
            $state.go('home');
          }
        }
  });
}])
