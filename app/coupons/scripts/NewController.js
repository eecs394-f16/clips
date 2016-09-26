angular
  .module('coupons')
  .controller("NewController", function ($scope, Coupons, supersonic) {
    $scope.coupons = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newcoupons = new Coupons($scope.coupons);
      newcoupons.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });