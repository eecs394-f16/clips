var appServices = angular.module('clips.services', []);

appServices.factory('UserCouponService', ['$resource',	function($resource){
	return $resource('https://eecs394-clips-backend.herokuapp.com/user/:userid/coupons', { userid: '@userid'	},	{
		get: { method: "GET", isArray: true },
		save: {
      method: "POST",
      url: 'https://eecs394-clips-backend.herokuapp.com/user/:userid/coupons/:couponid',
      params: {
        userid: '@userid',
        couponid: '@couponid'
      }
    },
		removeCoupon: {
			method: "GET",
      url: 'https://eecs394-clips-backend.herokuapp.com/delete/user/:userid/coupons/:couponid',
      params: {
        userid: '@userid',
        couponid: '@couponid'
      }
    }
	});
}]);

appServices.factory('CreateAccountService', ['$resource',	function($resource){
	return $resource('localhost:3000/account', {},{
	//return $resource('https://eecs394-clips-backend.herokuapp.com/account', {},{
	//{email: 'default', password: 'default', username: 'default', first_name: "default", last_name: 'default'},	{
		create: {
      method: "POST"
    }
	});
}]);

appServices.factory('UserService', ['$http',	function($http){

	var user = {
		email: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    id: -1
	};

	var login = function(email, password, success, failure){
		var req = {
		 method: 'GET',
		 url: 'https://eecs394-clips-backend.herokuapp.com/login',
		 params: {
				 email: email,
				 password: password
			 }
		}
		//TODO - Abstract this out into the service while keeping the $http
		$http(req).then(
			function(value){
				console.log(value)
				if(value.data.user_data){
					user.first_name = value.data.user_data.first_name;
					user.last_name = value.data.user_data.last_name;
					user.username = value.data.user_data.username;
					user.id =	value.data.user_data.id;
					user.email =value.data.user_data.email;
					user.error = undefined;
				}else{
					user.error = "Your password and email combination was not found."
					user.id = -1;
				}
				success(user);
			},
			function(error){
				failure(error);
				console.log(error)
			}
		);

	};


	var createAccount = function(){
		1+1;

	};

	var getUser = function(){
		return user;
	}
	return {
		login: login,
		getUser: getUser
	}
}]);

appServices.factory('NavBarService', [function(){
 	var pathStack = {
		coupons: [],
		businesses: []
	}

	var currentStates = {
		coupons: "#coupons",
		businesses: "#businesses"
	}


	var observerCallbacks = [];

	var pathStackPop = function(page){
		var next = pathStack[page].pop();
		notifyObservers();
		return next;
	}

	var pathStackPush = function(page, route, next){
		pathStack[page].push(route);
		currentStates[page] = next
		notifyObservers();
		return pathStack[page];
	}

	var getPathStack = function(page){
		return pathStack[page];
	}

	var getNextLocation = function(page){
		return currentStates[page];
	}




  //register an observer
  var registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  //call this when you know 'foo' has been changed
  var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };


	return {
		pathStackPush: pathStackPush,
		pathStackPop : pathStackPop,
		getPathStack: getPathStack,
		getNextLocation: getNextLocation,
		registerObserverCallback: registerObserverCallback
	};
}]);
