angular
    .module('hungaroApp')
    .controller('HomeController', home);

home.$inject = ['$scope', '$rootScope', '$mdDialog', '$http', '$mdEditDialog'];

function home($scope, $rootScope, $mdDialog, $http, $mdEditDialog) {
  'use strict';
  $scope.selected = [];
  $rootScope.dimension = 3;
  $scope.newValues = new Array($rootScope.dimension);
  console.log("newValuesLength: " + $scope.newValues.length);
  $rootScope.rows = [["11","12","13"],["21","22","23"], ["31","32","33"]];
  
  $scope.query = {
    limit: 5,
    page: 1
  };

  // this automatically adds item to selected array
  $scope.selectItem = function(item) {
      console.log("selected item: " + item);
      console.log("selected item index: " + $rootScope.rows.indexOf(item));
  };
  
  $scope.addRow = function($event) {
      $scope.newValues = new Array($rootScope.dimension);
       var parentEl = angular.element(document.body);
       $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
           locals: {
             newValues: $scope.newValues
           },
          templateUrl: 'templates/dialogs/newRow.html',
          clickOutsideToClose: true,
          controller: DialogController
    });
      function DialogController($scope, $mdDialog, newValues) {
        $scope.newValues = newValues;
        
        $scope.saveRow = function() {
          $rootScope.rows.push($scope.newValues);
          $mdDialog.hide();
        };
        
        $scope.closeDialog = function() {
          console.log($scope.newValues);
          $mdDialog.hide();
        };
        
        $scope.missingField = function() {
          for (var i = 0; i < newValues.length; i++) {
            if (typeof newValues[i] === "undefined") {
              return true;
            }
          }
          return false;
        };
      }
  };
  
  $scope.setDimensions = function($event) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
          parent: parentEl,
          targetEvent: $event,
           locals: {
             newDimension: 0
           },
          templateUrl: 'templates/dialogs/newDimension.html',
          clickOutsideToClose: true,
          controller: DialogController
    });
      function DialogController($scope, $mdDialog, newDimension) {
        
        $scope.saveNewDimension = function(newDimension) {
          $rootScope.dimension = newDimension;
          // updateTable(newDimension);
          if ($rootScope.rows.length > 0) {
            confirmNewDimension($event, newDimension);
          } else {
            updateTable(newDimension);
            $mdDialog.hide();
          }
          console.log("new dimension: " + $rootScope.dimension);
        };
        
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };
        
        $scope.missingField = function(newDimension) {
          console.log(newDimension);
          return ((typeof newDimension === "undefined") || newDimension < 2);
        };
              
        function confirmNewDimension(ev, newDimension) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
                .title('Table content will be cleaned!')
                .textContent('All table content will be erased after new dimension is set.')
                .ariaLabel('Content cleaning warning')
                .targetEvent(ev)
                .ok('Go ahead!')
                .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            updateTable(newDimension);
            $mdDialog.hide();
          });
        }
      }
  };
  
  $scope.deleteRow = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var dialogText = ""
    var dialogTitle = "";
    if ($scope.selected.length == 1) {
      dialogTitle = "Table row about to be deleted!"
      dialogText = "Are you sure you want the selected table row to be deleted?"
    } else {
      dialogTitle = "Multiple rable rows about to be deleted!"
      dialogText = "Are you sure you want the selected table rows to be deleted?"
    }
    var confirm = $mdDialog.confirm()
          .title(dialogTitle)
          .textContent(dialogText)
          .ariaLabel('Table row removal warning')
          .targetEvent(ev)
          .ok('I\'m sure!')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
        // Delete selected row(s)
        console.log("Rows length before removal: " + $rootScope.rows.length);
        //$rootScope.rows.splice($scope.selectedRow, 1);
        for (var i = 0; i < $scope.selected.length; i++) {
          $rootScope.rows.splice($rootScope.rows.indexOf($scope.selected[i]), 1);
        }
        $scope.selected = [];
        console.log("Rows length after removal: " + $rootScope.rows.length);
      $mdDialog.hide();
    }, function() {
      $mdDialog.hide();
    });
  };
  
  $scope.loadData = function(ev) {
       var parentEl = angular.element(document.body);
       $mdDialog.show({
          parent: parentEl,
          targetEvent: ev,
           locals: {
             file: null
           },
          templateUrl: 'templates/dialogs/loadData.html',
          clickOutsideToClose: true,
          controller: DialogController
    });
      function DialogController($scope, $mdDialog) {
        $scope.processInput = function() {
            angular.forEach($scope.files,function(obj) {
                parseTextFile(obj.lfDataUrl);
            });
          $mdDialog.hide();
        };
        
        $scope.closeDialog = function() {
          $mdDialog.hide();
        };

        function parseTextFile(file) {
          $http.get(file).success(function(data) {
            var resultData = parse(data);
            if (resultData.length == $rootScope.dimension * $rootScope.dimension) {
              fillTable(resultData)
            } else {
              showParsingAlert(ev);
            }
          });
        }
        
        // Takes the data response from the .txt file and performs parsing based
        // on indicated inut format.
        function parse(data) {
          var array = [];
          // throw error if first number is not a number
          if (!isNaN(parseInt(data[0], 10))) {
            var dimension = parseInt(data[0], 10);
            var index = 1;
            while (!isNaN(parseInt(data[index], 10))) {
              // maybe it's a number greater than 9
              dimension = dimension * 10 + parseInt(data[index], 10);
              index++;
            }
            console.log("Dimension is: " + dimension);
            // iterate and do the same for every other number
            for (var i = index; i <= data.length; i++) {
              var number = parseInt(data[i], 10);
              if (!isNaN(number)) {
                index = i+1;
                while (!isNaN(parseInt(data[index], 10))) {
                  number = number * 10 + parseInt(data[index], 10);
                  index++;
                }
                i = index-1;
                array.push(number);
              }
            }
            console.log("new array: " + array);
          }
          if (array.length == dimension*dimension) {
            // If parsing was successful, update new table dimension
            $rootScope.dimension = dimension;
          } else {
            // indicate unsuccessful parsing
            array = [];
          }
          return array;
        }
        // Takes the parsed data and fills the table with it
        function fillTable(data) {
          // initialize table
          updateTable($rootScope.dimension);
          // iterate through the array as a matrix
          for (var i = 0; i < $rootScope.dimension; i++) {
            var row = [];
            for (var j = 0; j < $rootScope.dimension; j++) {
              row.push(data[i * $rootScope.dimension + j]);
            }
            console.log("Row: " + row);
            // update table with new row
            $rootScope.rows.push(row);
          }
        }
      }
      function showParsingAlert(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(false)
            .title('Oops!')
            .textContent('We couldn\'t parse the data. Please make sure there are no format errors.')
            .ariaLabel('Pargin error')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }
  };
  
  $scope.editCell = function(event, data, rowIndex, cellIndex) {
  $mdEditDialog.small({
    modelValue: data,
    placeholder: 'Add new value',
    save: function (input) {
      data = parseInt(input.$modelValue);
      console.log("new value:" +input.$modelValue);
      console.log("row index: " +rowIndex);
      console.log("cell index: " +cellIndex);
      if (!isNaN(data) && data >= 1) {
        var copy = $rootScope.rows.slice();
        copy[rowIndex][cellIndex] = data;
        $rootScope.rows = copy;
      }
    },
    targetEvent: event
  });
};
  
  function updateTable(dimension) {
    $scope.newValues = new Array(dimension);
    $rootScope.rows = [];
  }
  
  $scope.sendEmail = function(email, subject) {
      var link = "mailto:"+ email
                 + "&subject=" + escape(subject);
  
      window.open(link, '_blank');
  };
}