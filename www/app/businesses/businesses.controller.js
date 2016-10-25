/* recommended */
var BusinessesController = function($scope, $http, NavBarService){

    $scope.businesses = []
    $scope.waiting = true;
    $scope.error = undefined;

    $http({
        method: "GET",
        url: "https://eecs394-clips-backend.herokuapp.com/business/all"
    }).then(
        function successCallback(response){
            $scope.businesses = response.data;
            $scope.waiting = false;
        }, function errorCallback(error){
            console.log(error);
            $scope.error = error;
            $scope.waiting = false;
        }
    );

    $scope.goTo = function(id){
        NavBarService.pathStackPush('businesses', '/businesses', "#businesses/"+id)
    }









    $scope.goTo = function(id){
        NavBarService.pathStackPush('businesses', '/businesses', "#businesses/"+id)
    }

};


angular
    .module('clips.businesses')
    .controller("BusinessesController", BusinessesController);

BusinessesController.$inject = ['$scope', '$http', "NavBarService"];
