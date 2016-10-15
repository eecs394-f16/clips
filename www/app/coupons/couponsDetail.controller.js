/**
 * Created by djdapz on 9/29/16.
 */
/* recommended */
var CouponsDetailController = function($scope, $routeParams, $http, UserCouponService){
    $scope.couponId = $routeParams.couponId;
    $scope.saving = false;
    $scope.saved = false;

    $scope.coupon = undefined;

    $scope.error = undefined;
    $scope.waiting = true;

    $scope.saveCoupon = function(){
      UserCouponService.save({userid: 1, couponid:   $scope.couponId}).$promise.then(
        //success
        function(value){
          console.log('saved');
          $scope.saved = true;
        },

        //error
        function(error){
          console.log('error');
          $scope.error = error;
        }
      )
    }

    $scope.removeCoupon = function(){
      UserCouponService.removeCoupon({userid: 1, couponid:  $scope.couponId}).$promise.then(
        //success
        function(value){
          console.log('deleted');
          $scope.saved = false;
        },

        //error
        function(error){
          console.log('error - delete');
          $scope.error = error;
        }
      )
    }


    //add user clause and edit sql so we can know wether or not to show the save button
    //TODO - make service
    $http({
        method: "GET",
        url: " https://eecs394-clips-backend.herokuapp.com/coupon/" + $scope.couponId + "/user/" + 1
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


};


angular
    .module('clips.coupons')
    .controller("CouponsDetailController", CouponsDetailController);

CouponsDetailController.$inject = ['$scope', "$routeParams", "$http", "UserCouponService"];
