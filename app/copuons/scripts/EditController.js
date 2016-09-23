angular
  .module('copuons')
  .controller("EditController", function ($scope, Copuons, supersonic) {
    $scope.copuons = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Copuons.find(steroids.view.params.id).then( function (copuons) {
      $scope.$apply(function() {
        $scope.copuons = copuons;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.copuons.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
