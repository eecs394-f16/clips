(function(angular) {

    angular.module("clips")
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/account', {
                    templateUrl: 'app/account/main.html',
                    controller: 'AccountController'}).
                when('/coupons', {
                    templateUrl: 'app/coupons/main.html',
                    controller: 'CouponsController'}).
                when('/businesses', {
                    templateUrl: "app/businesses/main.html",
                    controller: "BusinessesController"
                }).
                when('/coupons/:couponId', {
                    templateUrl: 'app/coupons/detail.html',
                    controller: 'CouponsDetailController'
                }).
                when('/businesses/:businesssId', {
                    templateUrl: 'app/businesses/detail.html',
                    controller: 'BusinessesDetailsController'
                }).
                otherwise({
                    redirectTo: '/coupons'
                });

        }]);


}(angular));
