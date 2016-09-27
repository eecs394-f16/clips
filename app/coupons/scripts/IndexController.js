angular
  .module('coupons')
  .controller("IndexController", function ($scope, $rootScope, Coupons, Business, supersonic) {
    $scope.couponss = null;
    $scope.business = null;
    $scope.showSpinner = true;
    $scope.debugText = "baseCase";

    /////////////////////////////////////////////////////
    //PSUEDO SERVICE BELOW DO NOT WRITE BELOW THIS LINE//
    /////////////////////////////////////////////////////

    var finishSetup = function(){
      $scope.couponss = fromCouponsPerspective;
      $scope.business = fromBusinessPerspective;
      $scope.showSpinner = false;
      $scope.debugText = $scope.copuonss
      $rootScope.couponss = fromCouponsPerspective;
      $rootScope.business = fromBusinessPerspective;
    }

    // all code below, can be used in other files to link Coupons and Businesses!
    // CAREFUL!!
    var businessesAndCouponsLinked = false;
    var fromCouponsPerspective = {};
    var fromBusinessPerspective = {};
    var fromBusinessPerspective_set  = false;
    var fromCouponsPerspective_set  = false;

    var init = function(){
      if($rootScope.copuonss && $rootScope.businesses){
        $scope.couponss = $rootScope.couponss.
        $scope.business = $rootScope.business.
        $scope.showSpinner = false;
      }else{
        Coupons.all().whenChanged( function (couponss) {
            $scope.$apply( function () {
              fromCouponsPerspective = couponss;
              fromCouponsPerspective_set = true;
              checkShowSpinner();
            });
        });

        Business.all().whenChanged( function (business) {
            $scope.$apply( function () {
              createBusinessHash(business);
              fromBusinessPerspective_set = true;
              checkShowSpinner();
            });
        });
      }
    }

    var createBusinessHash = function(businesses){
      for(var i = 0; i < businesses.length; i++){
        if(fromBusinessPerspective[businesses[i].ID]){
          supersonic.logger.error("ERROR: Cannot be multiple businesses with same ID;")
        }else{
          fromBusinessPerspective[businesses[i].ID] = businesses[i];
        }
      }
    }

    var checkShowSpinner = function(){
      if(fromBusinessPerspective_set && fromCouponsPerspective_set){
          linkBusinessAndCoupons();
      }
    }

    var linkBusinessAndCoupons = function(){
      var businessID;
      for(var i = 0; i < fromCouponsPerspective.length; i++){
        $scope.debugText = i;
        businnessID = fromCouponsPerspective[i].business_id;
        fromCouponsPerspective[i]['business_name'] = fromBusinessPerspective[businnessID].name;
        //create an array within the coupons
        if(fromBusinessPerspective[businnessID].coupons == undefined){
          fromBusinessPerspective[businnessID].coupons = [];
        }
        fromBusinessPerspective[businnessID].coupons.push(fromCouponsPerspective[i]);
      }
      businessesAndCouponsLinked = true;
      finishSetup();
    }

    init();
  });
