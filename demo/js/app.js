var app = angular.module('app', ['angular-mask-plugin']);
app.controller('exampleController', ['$scope',
  function($scope) {

    $scope.onChangeEvent = function(cep) {
      console.log("onChange event !!!", cep);
    };

	  $scope.onCompleteEvent = function(cep) {
      console.log("onComplete event !!!", cep);
    };

    $scope.submit = function() {
      $scope.maskedCurrencyValue = 200000;
    };
  }
]);