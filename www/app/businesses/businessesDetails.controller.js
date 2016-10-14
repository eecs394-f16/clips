/* recommended */
var BusinessesDetailsController = function($scope, $http, NavBarService, $routeParams){
    $scope.businesssId = $routeParams.businesssId
    $scope.coupons = undefined;
    $scope.business = undefined;
    $scope.error = undefined;
    $scope.waiting = true;
    $scope.center = {
	lat: 42.0451,
	lng: -87.6877,
	zoom: 2
    }

    $http({
        method: "GET",
        url: " https://eecs394-clips-backend.herokuapp.com/business/" + $scope.businesssId
    }).then(
        function successCallback(response){
            $scope.business = response.data[0];

	    $scope.center = {
		lat: $scope.business.lat,
		lng: $scope.business.lon,
		zoom: 15
	    }
	    
            $scope.waiting = false;
        }, function errorCallback(error){
            console.log(error);
            $scope.error = error;
            $scope.waiting = false;
        }
    );

    $http({
        method: "GET",
        url: " https://eecs394-clips-backend.herokuapp.com/business/coupons/" + $scope.businesssId
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
        NavBarService.pathStackPush('businesses', '/businesses/'+    $scope.businesssId , "#businesses/"+    $scope.businesssId )
    }
};


angular
    .module('clips.businesses')
    .controller("BusinessesDetailsController", BusinessesDetailsController);

BusinessesDetailsController.$inject = ['$scope', '$http', "NavBarService", "$routeParams"];
