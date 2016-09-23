angular
  .module('business')
  .controller("NewController", function ($scope, Business, supersonic) {
    $scope.business = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newbusiness = new Business($scope.business);
      newbusiness.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });