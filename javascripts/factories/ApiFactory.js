"use strict";

let BookApiKeys = {};

bookcase.factory("ApiFactory", function($q, $http, FIREBASE_CONFIG, GOOGLE_APIKEY, BookFactory){

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

	return {booksFromAPI:booksFromAPI};

});