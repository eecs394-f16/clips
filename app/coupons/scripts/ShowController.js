angular
  .module('coupons')
  .controller("ShowController", function ($scope, Coupons, supersonic) {
    $scope.coupons = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Coupons.find($scope.dataId).then( function (coupons) {
        $scope.$apply( function () {
          $scope.coupons = coupons;
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
      $scope.coupons.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });