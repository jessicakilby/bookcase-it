"use strict";

bookcase.factory("BookFactory", function($q, $http, FIREBASE_CONFIG){

	let getBookFB = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/bookcase.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(getBookResponse){
				let bookcase = [];
				Object.keys(getBookResponse).forEach(function(key){
					getBookResponse[key].id = key;
					bookcase.push(getBookResponse[key]);
				});
				resolve(bookcase);
			}).error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	let postBookFB = function(newBook){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/bookcase.json`, JSON.stringify({
				title: newBook.title,
				author: newBook.author,
				genre: newBook.genre,
				isbn: newBook.isbn,
				worth: newBook.worth,
				loanedOut: newBook.loanedOut,
				notes: newBook.notes,
				uid: newBook.uid
			}))
			.success(function(postBookResponse){
				resolve(postBookResponse);
			})
			.error(function(postBookError){
				reject(postBookError);
			});
		});
	};

});