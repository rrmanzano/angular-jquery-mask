var app = angular.module('app', ['mask-plugin']);
app.controller('exampleController', ['$scope',
  function($scope) {

    $scope.onChangeValue = function() {
      console.log("onChange event");
    };

    $scope.submit = function() {
      $scope.maskedCurrencyValue = 200000;
    };
  }
]);