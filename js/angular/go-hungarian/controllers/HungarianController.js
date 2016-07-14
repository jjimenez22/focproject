angular
    .module('hungaroApp')
    .controller('HungarianController', goHung);

goHung.$inject = ['$scope', '$rootScope'];

function goHung($scope, $rootScope) {
    var copy = angular.copy($rootScope.rows);
    var hungarian = Hung(copy);
    console.log(hungarian);
    var zFunction = resolver(hungarian[hungarian.length-1].result);
    console.log("zFunction: " + zFunction);
    var z = resultado(zFunction, $rootScope.rows);
    console.log("z value: " + z);
}