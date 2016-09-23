angular
  .module('business')
  .controller("ShowController", function ($scope, Business, supersonic) {
    $scope.business = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Business.find($scope.dataId).then( function (business) {
        $scope.$apply( function () {
          $scope.business = business;
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
      $scope.business.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });