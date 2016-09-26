angular
  .module('coupons')
  .controller("IndexController", function ($scope, Coupons, supersonic) {
    $scope.couponss = null;
    $scope.showSpinner = true;

    Coupons.all().whenChanged( function (couponss) {
        $scope.$apply( function () {
          $scope.couponss = couponss;
          $scope.showSpinner = false;
        });
    });
  });