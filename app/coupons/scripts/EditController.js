angular
  .module('coupons')
  .controller("EditController", function ($scope, Coupons, supersonic) {
    $scope.coupons = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Coupons.find(steroids.view.params.id).then( function (coupons) {
      $scope.$apply(function() {
        $scope.coupons = coupons;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.coupons.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
