angular
    .module('hungaroApp')
    .controller('HungarianController', goHung);

goHung.$inject = ['$scope', '$rootScope', '$location', '$anchorScroll'];

function goHung($scope, $rootScope, $location, $anchorScroll) {
    var copy = angular.copy($rootScope.rows);
    $scope.hungarian = Hung(copy);
    console.log($scope.hungarian);
    // Bits of pre-processing
    for (var i = 2; i < $scope.hungarian.length; i++) {
      // Need the previous iteration result.
      // This will ease the iterations throgh the views
      $scope.hungarian[i].prevResult = $scope.hungarian[i-1].result;
    }
    $scope.restOfSolution = $scope.hungarian.slice(2, $scope.hungarian.length);
    console.log("REST OF SOLUTION:");
    console.log($scope.restOfSolution);
    var zFunction = resolver($scope.hungarian[$scope.hungarian.length-1].result);
    console.log(zFunction);
    var z = resultado(zFunction, $rootScope.rows);
    console.log("z value: " + z);

    /**
    * Gives styling depending on whether the corresponding element is a
    * minimum value or not from the row or column.
    * @param iter - number of the iteration.
    * @param mini - row index of the minimum value to evaluate.
    * @param min - column index of the minimum value to evaluate.
    */
    $scope.isMin = function(iter, mini, minj) {
      for (var i = 0; i < $rootScope.dimension; i++) {
        if (mini == i && minj == $scope.hungarian[iter].minvec[i]) {
          return {'color':'blue', 'font-weight':'bold'};
        }
      }
      return {'color':'black'};
    }

    /**
    * Gives styling depending on whether the corresponding element is the
    * minimum value from the table.
    * @param iter - number of the iteration.
    * @param mini - row index of the minimum value to evaluate.
    * @param min - column index of the minimum value to evaluate.
    */
    $scope.isOnlyMin = function(iter, mini, minj) {
      if ($scope.hungarian[iter].mini == mini && $scope.hungarian[iter].minj == minj) {
        return {'color':'blue', 'font-weight':'bold'};
      } else {
        return {'color':'black'};
      }
    }

    /**
    * Gives styling depending on whether the corresponding element is
    * part of the z function solution.
    * @param mini - row index of the minimum value to evaluate.
    * @param min - column index of the minimum value to evaluate.
    */
    $scope.isSolution = function(row, col) {

      for (var i = 0; i < zFunction.length; i++) {
        if (zFunction[i].i == row && zFunction[i].j == col) {
          return {'color':'green','font-weight':'bold'};
        }
      }
      return {'color':'grey'};
    }

    $scope.scrollToBottom = function()  {
      window.scrollTo(0,document.body.scrollHeight);
    }

    $scope.isStrike = function(strikethrough, row, col) {
        if (strikethrough[row][col]) {
          return {'color':'red'};
        } else {
          return {'color':'black'};
        }
    }

    $scope.formatSolution = function() {
      var sum = "";
      for (var i = 0; i < zFunction.length; i++) {
        if (typeof zFunction[i].i === "undefined" || typeof zFunction[i].j === "undefined")
          continue;
        sum += $rootScope.rows[zFunction[i].i][zFunction[i].j];
        sum += i == zFunction.length - 1 ? "" : " + ";
      }
      var acum = 0;
      for (var i = 0; i < zFunction.length; i++) {
        if (typeof zFunction[i].i === "undefined" || typeof zFunction[i].j === "undefined")
          continue;
        acum += $rootScope.rows[zFunction[i].i][zFunction[i].j];
      }
      sum += " = " + acum;
      console.log(sum);
      return sum;
    }

    $scope.gotoElement = function(id) {
      // id of the element to scroll to.
      $location.hash(id);
      $anchorScroll();
    };
}
