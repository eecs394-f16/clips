/* recommended */
var AccountController = function($scope, $http, UserCouponService){
  $scope.savedCoupons = [];
  $scope.error = undefined;
  $scope.waiting = true;

  //TODO - Make userid dynamic
  UserCouponService.get({userid: 1}).$promise.then(
		//success
		function( value ){
			$scope.savedCoupons = value ? value : [];
      $scope.waiting = false;

      //this processing should be moved to backend
      for(var i = 0; i<$scope.savedCoupons.length; i++){
        $scope.savedCoupons[i].deleting = false;
        $scope.savedCoupons[i].index = i;
      }
		},
		//error
		function( error ){
			$scope.error = error;
      $scope.waiting = false;
		}
	);

  //TODO - Make userid dynamic
  $scope.removeCoupon = function(couponId, couponIndex){
    UserCouponService.removeCoupon({userid: 1, couponid: couponId}).$promise.then(
      //success
      function( value ){
        $scope.deleted;
        $scope.savedCoupons.splice(couponIndex, 1)
      },
      //error
      function( error ){
        $scope.error = error;
        $scope.waiting = false;
      }
    );

    $scope.savedCoupons[couponIndex].deleting = true;
  }





};

angular
    .module('clips.account')
    .controller("AccountController", AccountController);

AccountController.$inject = ['$scope', '$http', "UserCouponService"];
