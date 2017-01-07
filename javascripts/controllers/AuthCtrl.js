"use strict";

bookcase.controller("AuthCtrl", function($scope, $location, $rootScope, AuthFactory, UserFactory){

	$rootScope.user = false;
	$scope.showSignIn = true; //ng-show="showSignIn" in auth.html
	$scope.showRegistration = false; //ng-show"showRegistration" in auth.html
	$scope.signIn = {
		email: "a@a.com",
		password:"123456"
	};

	if($location.path()==="/logout"){
		AuthFactory.logout(); //if click logout, log user out
		$rootScope.user = {}; //clear out user info
		$location.url("/auth"); //take them back to auth page
	}

	//function that you can use for both sign-in and registration, authorizes, then clears their info and takes them to Home view.
	let signUserIn = function(emailAndPassword){
		AuthFactory.authenticate(emailAndPassword).
		then(function(nowLoggedIn){
			return UserFactory.getUserFromFB(nowLoggedIn.uid);
		}).then(function(userCredentials){
			$rootScope.user = userCredentials;
			$scope.login = {};
			$scope.register = {};
			$location.url("/bookcase/home");
		});
	};

	$scope.showSignInDiv = function(){
		$scope.showSignIn = true; 
		$scope.showRegistration = false;
	};
	$scope.showRegistrationDiv = function(){
		$scope.showSignIn = false; 
		$scope.showRegistration = true;
	};
	$scope.signInUser = function(signInUser){
		signUserIn(signInUser);
	};
	$scope.registerUser = function(registerNewUser){
		AuthFactory.registerWithEmail(registerNewUser).then(function(success){
			registerNewUser.uid = success.uid;
			return UserFactory.postUserToFB(registerNewUser);
		})
		.then(function(completeRegistration){
			signUserIn(registerNewUser);
		});
	};

});