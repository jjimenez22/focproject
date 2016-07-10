angular
    .module('hungaroApp')
    .controller('HomeController', home);

home.$inject = ['$scope', '$rootScope'];

function home($scope, $rootScope, $mdDialog) {
  'use strict';
  $scope.title = "Hungarian algorithm";
  
  $scope.selected = [];
  $scope.selectedIndex = null;
  $scope.dimension = 3;
  $scope.newValues = new Array($scope.dimension);
  console.log("newValuesLength: " + $scope.newValues.length);
  $scope.query = {
    limit: 5,
    page: 1
  };
  
  $scope.show = function() {
    console.log($scope.selected);
  };
    
  $scope.selectItem = function(item) {
      console.log("selected item: " + item);
      $scope.selectedRow = $scope.rows.indexOf(item);
      console.log("selected item index: " + $scope.rows.indexOf(item));
  };
  
  $scope.rows = [["11","12","13"],["21","22","23"],["31","32","33"]];
  
  $scope.addRow = function() {

  };
}