/* recommended */
var AccountController = function($scope, $http, UserCouponService, CreateAccountService, UserService){
  $scope.savedCoupons = [];
  $scope.error = undefined;
  $scope.waiting = true;
  $scope.creatingAccount =false;
  $scope.loggedIn = false;
  $scope.loggingIn = true;
  $scope.user = UserService.getUser();

  $scope.loginInfo ={
    password: undefined,
    email: undefined,
    error: undefined
  }
  $scope.createAccountInfo = {
    password: undefined,
    email: undefined,
    error: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined
  }

  var init = function(){
    if($scope.user.id == -1){
      $scope.loggedIn = false;
    }else{
      getCoupons($scope.user.id);
      $scope.loggedIn = true;
    }
  }


  var getCoupons = function(userid){
    UserCouponService.get({userid: userid}).$promise.then(
      //success
      function( value ){
        $scope.savedCoupons = value ? value : [];
        $scope.waiting = false;

        //this processing should be moved to backend
        for(var i = 0; i<$scope.savedCoupons.length; i++){
          $scope.savedCoupons[i].deleting = false;
          $scope.savedCoupons[i].index = i;
        }
      },
      //error
      function( error ){
        $scope.error = error;
        $scope.waiting = false;
      }
    );
  }


  $scope.removeCoupon = function(couponId, couponIndex){
    UserCouponService.removeCoupon({userid: $scope.user.id, couponid: couponId}).$promise.then(
      //success
      function( value ){
        $scope.deleted;
        $scope.savedCoupons.splice(couponIndex, 1);
        for(var i = couponIndex; i < $scope.savedCoupons.length; i++){
            $scope.savedCoupons.index;
        }
      },
      //error
      function( error ){
        $scope.error = error;
        $scope.waiting = false;
      }
    );

    $scope.savedCoupons[couponIndex].deleting = true;
  }

  $scope.switchToCreateAccount = function(){
    $scope.creatingAccount = true;
    $scope.loggingIn = false;
  }

  $scope.switchToLogin = function(){
    $scope.creatingAccount = false;
    $scope.loggingIn = true;
  }

  $scope.logIn = function(){
    //TODO - check if email is valid
    $scope.loginInfo.error = undefined;
    if($scope.loginInfo.password == undefined || $scope.loginInfo.email == undefined){
      $scope.loginInfo.error = "You need to emter a valid email address and password";
    }else{
      UserService.login($scope.loginInfo.email , $scope.loginInfo.password,
        function(user){
          $scope.user = user;
          if(user.error){
            $scope.loginInfo.error = $scope.user.error;
            $scope.loginInfo.password = "";
          }else{
            getCoupons($scope.user.id);
            $scope.loggedIn = true;
          }
        },
        function(error){
          $scope.loginInfo.error = error;
        }
      )
    }
  }

  $scope.createAccount = function(){
    //TODO - check if email is valid
    $scope.createAccountInfo.error = undefined;
    if($scope.createAccountInfo.password == undefined
        || $scope.createAccountInfo.email == undefined
        || $scope.createAccountInfo.first_name == undefined
        || $scope.createAccountInfo.last_name == undefined
        || $scope.createAccountInfo.username == undefined){
      $scope.createAccountInfo.error = "You need to emter a valid email address and password";
    }else{


      UserService.createAccount($scope.createAccountInfo,
        function(value){
          $scope.loggedIn = true;
          $scope.loginInfo.email = $scope.createAccountInfo.email;
          $scope.loginInfo.password = $scope.createAccountInfo.password;
          $scope.logIn()
        },
        function(error){
          $scope.createAccountInfo.password = undefined;
          $scope.createAccountInfo.error = error;
        }
      )

    }
  }

  init();
};

angular
    .module('clips.account')
    .controller("AccountController", AccountController);

AccountController.$inject = ['$scope', '$http', "UserCouponService","CreateAccountService", "UserService"];
