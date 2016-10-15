angular.module('clips.coupons', []);
angular.module('clips.businesses', []);
angular.module('clips.account', []);



angular.module('clips', ['supersonic',
                          'ngRoute',
                          'ngResource',
                          "leaflet-directive",
                          'clips.coupons',
                          'clips.businesses',
                          "clips.services",
                          "clips.account"
])
.controller('IndexController', function($scope, supersonic) {

});
