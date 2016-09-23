angular
  .module('copuons')
  .controller("ShowController", function ($scope, Copuons, supersonic) {
    $scope.copuons = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Copuons.find($scope.dataId).then( function (copuons) {
        $scope.$apply( function () {
          $scope.copuons = copuons;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.copuons.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });