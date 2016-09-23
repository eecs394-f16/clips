angular
  .module('business')
  .controller("IndexController", function ($scope, Business, supersonic) {
    $scope.businesss = null;
    $scope.showSpinner = true;

    Business.all().whenChanged( function (businesss) {
        $scope.$apply( function () {
          $scope.businesss = businesss;
          $scope.showSpinner = false;
        });
    });
  });