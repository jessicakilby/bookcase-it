"use strict";

bookcase.factory("AuthFactory", function($q, $http, $rootScope, FIREBASE_CONFIG){

	var currentUserData = null;
	let isAuthenticated = function(){
		return firebase.auth().currentUser ? true : false;
	};
	let getUser = function(){
		return firebase.auth().currentUser;
	};
	let logout = function(){
		firebase.auth().signOut();
	};
	let authenticate = function(credentials){
		return $q((resolve, reject)=>{
			firebase.auth().signInWithEmailAndPassword(
				credentials.email,
				credentials.password).then((authenticateData)=>{
				resolve(authenticateData);
			}).catch((errorAuthData)=>{
				reject(errorAuthData);
			});
		});
	};

	let registerWithEmail = function(user){
		return $q((resolve, reject)=>{
			firebase.auth().createUserWithEmailAndPassword(
				user.email,
				user.password).then((authenticateData)=>{
					resolve(authenticateData);
			}).catch((errorAuthData)=>{
				reject(errorAuthData);
			});
		});
	};

	return {
		isAuthenticated:isAuthenticated,
		getUser:getUser,
		logout:logout,
		authenticate:authenticate,
		registerWithEmail:registerWithEmail
	};

});