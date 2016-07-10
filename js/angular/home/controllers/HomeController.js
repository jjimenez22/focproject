angular
    .module('hungaroApp')
    .controller('HomeController', home);

home.$inject = ['$scope', '$rootScope', '$mdSidenav'];

function home($scope, $rootScope, $mdSidenav) {
    'use strict';
    $scope.title = "Método Húngaro";
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
    
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
}