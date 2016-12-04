"use strict";

bookcase.factory("UserFactory", function($q, $http, FIREBASE_CONFIG){

	let postUserToFB = function(authorizationData){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`, JSON.stringify({
				uid: authorizationData.uid,
				username: authorizationData.username
			}))
			.success(function(responseFromPost){
				resolve(responseFromPost);
			})
			.error(function(fromPostError){
				reject(fromPostError);
			});
		});
	};

	let getUserFromFB = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(responseFromGet){
				let users = [];
				Object.keys(responseFromGet).forEach(function(key){
					users.push(responseFromGet[key]);
				});
				resolve(users[0]);
			}).error(function(errorFromGet){
				reject(errorFromGet);
			});
		});
	};
	return {
		postUserToFB:postUserToFB,
		getUserFromFB:getUserFromFB
	};
});