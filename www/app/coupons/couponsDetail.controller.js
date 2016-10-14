/**
 * Created by djdapz on 9/29/16.
 */
/* recommended */
var CouponsDetailController = function($scope, $routeParams, $http){
    $scope.couponId = $routeParams.couponId

    $scope.coupon = undefined;

    $scope.error = undefined;
    $scope.waiting = true;
    $scope.showQR = false;
    $scope.redeemcount = 0;

    $http({
        method: "GET",
        url: " https://eecs394-clips-backend.herokuapp.com/coupon/" + $scope.couponId
    }).then(
        function successCallback(response){
            $scope.coupon = response.data[0];
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

};


angular
    .module('clips.coupons')
    .controller("CouponsDetailController", CouponsDetailController);

CouponsDetailController.$inject = ['$scope', "$routeParams", "$http"];

