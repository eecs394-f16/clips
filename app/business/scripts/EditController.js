angular
  .module('business')
  .controller("EditController", function ($scope, Business, supersonic) {
    $scope.business = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Business.find(steroids.view.params.id).then( function (business) {
      $scope.$apply(function() {
        $scope.business = business;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.business.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
