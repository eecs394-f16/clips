angular
  .module('copuons')
  .controller("IndexController", function ($scope, Copuons, supersonic) {
    $scope.copuonss = null;
    $scope.showSpinner = true;

    Copuons.all().whenChanged( function (copuonss) {
        $scope.$apply( function () {
          $scope.copuonss = copuonss;
          $scope.showSpinner = false;
        });
    });
  });