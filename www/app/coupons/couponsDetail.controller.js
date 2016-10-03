/**
 * Created by djdapz on 9/29/16.
 */
/* recommended */
var CouponsDetailController = function($scope, $routeParams, $http){
    $scope.couponId = $routeParams.couponId

    $scope.coupon = undefined;

    $scope.error = undefined;
    $scope.waiting = true;

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
};


angular
    .module('clips.coupons')
    .controller("CouponsDetailController", CouponsDetailController);

CouponsDetailController.$inject = ['$scope', "$routeParams", "$http"];

