var app = angular.module('hungaroApp', ['ngMaterial']);
app.controller('TitleController', function($scope) {
  $scope.title = 'My App Title';
});
app.controller('AppCtrl', function($scope) {
  var imagePath = 'img/list/60.jpeg';
  $scope.todos = [];
  for (var i = 0; i < 15; i++) {
    $scope.todos.push({
      face: imagePath,
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }
});

angular
    .module('hungaroApp')
    .controller('HomeController', home);

home.$inject = ['$scope', '$rootScope'];

function home($scope, $rootScope, $http) {
    'use strict';
    
    $scope.title = "Método Húngaro"
    var imagePath = '../../../../images/60.png';
    $scope.todos = [];
    for (var i = 0; i < 15; i++) {
        $scope.todos.push({
            face: imagePath,
            what: "Brunch this weekend?",
            who: "Min Li Chan",
            notes: "I'll be in your neighborhood doing errands."
        });
    }
}