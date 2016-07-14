angular
    .module('hungaroApp')
    .controller('HungarianController', goHung);

goHung.$inject = ['$scope', '$rootScope'];

function goHung($scope, $rootScope) {
    var copy = angular.copy($rootScope.rows);
    $scope.hungarian = Hung(copy);
    console.log($scope.hungarian);
    /*var zFunction = resolver(hungarian[hungarian.length-1].result);
    console.log("zFunction: " + zFunction);
    var z = resultado(zFunction, $rootScope.rows);
    console.log("z value: " + z);*/

    /**
    * Gives styling depending on whether the corresponding element is a minimum value or not.
    * @param iter - number of the iteration.
    * @param mini - row index of the minimum value to evaluate.
    * @param min - column index of the minimum value to evaluate.
    */
    $scope.isMin = function(iter, mini, minj) {
      console.log("mini=" + mini);
      console.log("minj=" + minj);
      for (var i = 0; i < $rootScope.dimension; i++) {
        if (mini == i && minj == $scope.hungarian[iter].minvec[i]) {
          return {'color':'blue', 'font-weight':'bold'};
        }
      }
      return {'color':'black'};
    }
}
