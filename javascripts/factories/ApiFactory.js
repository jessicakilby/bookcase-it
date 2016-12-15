"use strict";

let BookApiKeys = {};

bookcase.factory("ApiFactory", function($q, $http, FIREBASE_CONFIG, GOOGLE_APIKEY, BookFactory, WishFactory){

	let booksFromAPI = (searchBook)=>{
		return $q((resolve, reject)=>{
			$http({
				method: 'GET', 
				url: `https://www.googleapis.com/books/v1/volumes?q=${searchBook}&key=${GOOGLE_APIKEY.client_id}`
			}).then((response)=>{
				resolve(response.data.items);
			},(errorResponse)=>{
				reject(errorResponse);
			});
		});
	};

	let getSingleBookChoice = (bookChoice)=>{
		return $q((resolve, reject)=>{
			$http({
				method: 'GET',
				url: `https://www.googleapis.com/books/v1/volumes?q=${bookChoice}&key=${GOOGLE_APIKEY.client_id}`
			}).then((response)=>{
				resolve(response);
			},(errorResponse)=>{
				reject(errorResponse);
			});
		});
	};

	return {
		booksFromAPI:booksFromAPI,
		getSingleBookChoice:getSingleBookChoice
	};

});