/* recommended */
var CouponsController = function($scope, $http, NavBarService){
    $scope.error = undefined;
    $scope.waiting = true;

    $http({
        method: "GET",
        url: "https://eecs394-clips-backend.herokuapp.com/coupon/all"
    }).then(
        function successCallback(response){
            $scope.coupons = response.data;
            $scope.waiting = false;
        }, function errorCallback(error){
            console.log(error);
            $scope.error = error;
            $scope.waiting = false;
        }
    );
    $scope.goTo = function(id){
        NavBarService.pathStackPush('coupons', '/coupons', "#coupons/"+id)
    }


    $scope.coupons = undefined;

};


angular
    .module('clips.coupons')
    .controller("CouponsController", CouponsController);

CouponsController.$inject = ['$scope', '$http', "NavBarService"];
