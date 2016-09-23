angular
  .module('copuons')
  .controller("NewController", function ($scope, Copuons, supersonic) {
    $scope.copuons = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newcopuons = new Copuons($scope.copuons);
      newcopuons.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });