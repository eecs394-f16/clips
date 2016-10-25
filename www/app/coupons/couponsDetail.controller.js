/**
 * Created by djdapz on 9/29/16.
 */
/* recommended */
var CouponsDetailController = function($scope, $routeParams, $http, UserCouponService, UserService){
    $scope.couponId = $routeParams.couponId;
    $scope.saving = false;
    $scope.saved = false;
    $scope.coupon = undefined;
    $scope.error = undefined;
    $scope.waiting = true;
    $scope.showQR = false;
    $scope.redeemcount = 0;
    $scope.processing = false;
    $scope.user = UserService.getUser();

    $scope.saveCoupon = function(){
      if($scope.user.id == -1){
          $scope.error = "You must login or create an account to save deals!"
          return;
      }
      $scope.processing = true;
      UserCouponService.save({userid: $scope.user.id, couponid:   $scope.couponId}).$promise.then(
        //success
        function(value){
          console.log('saved');
          $scope.saved = true;
          $scope.processing = false;
        },

        //error
        function(error){
          console.log('error');
          $scope.error = error;
          $scope.processing = false;
        }
      )
    }

    $scope.goTo = function(id){
        NavBarService.pathStackPush('businesses', '/businesses/'+    $scope.businesssId , "#businesses/"+    $scope.businesssId )
    }

    $scope.removeCoupon = function(){
      $scope.processing = true;
      UserCouponService.removeCoupon({userid: $scope.user.id, couponid:  $scope.couponId}).$promise.then(
        //success
        function(value){
          console.log('deleted');
          $scope.saved = false;
          $scope.processing = false;
        },

        //error
        function(error){
          console.log('error - delete');
          $scope.error = error;
          $scope.processing = false;
        }
      )
    }


    //add user clause and edit sql so we can know wether or not to show the save button
    //TODO - make service
    $http({
        method: "GET",
        url: " https://eecs394-clips-backend.herokuapp.com/coupon/" + $scope.couponId + "/user/" + $scope.user.id
    }).then(
        function successCallback(response){
            $scope.coupon = response.data[0];
            if($scope.coupon.count == 0){
              $scope.saved = false;
            }else{
              $scope.saved = true;
            }
            $scope.waiting = false;
        }, function errorCallback(error){
            console.log(error);
            $scope.error = error;
            $scope.waiting = false;
        }
    );

    $scope.showCode = function() {
                $scope.showQR = true;
                $scope.redeemcount ++}
    $scope.hideCode = function() {
                $scope.showQR = false;
                $scope.redeemcount ++}


};


angular
    .module('clips.coupons')
    .controller("CouponsDetailController", CouponsDetailController);

CouponsDetailController.$inject = ['$scope', "$routeParams", "$http", "UserCouponService", "UserService"];
