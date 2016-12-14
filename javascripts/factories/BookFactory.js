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
				image: newBook.image,
				title: newBook.title,
				author: newBook.author,
				genre: newBook.genre,
				isbn: newBook.isbn,
				description: newBook.description,
				loanedOut: newBook.loanedOut,
				toWho: newBook.toWho,
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

	let getSingleBook = function(bookId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/bookcase/${bookId}.json`)
			.success(function(getSingleBookResponse){
				resolve(getSingleBookResponse);
			})
			.error(function(singelBookError){
				reject(singelBookError);
			});
		});
	};

	let deleteBookFB = function(bookId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/bookcase/${bookId}.json`)
			.success(function(deleteResponse){
				resolve(deleteResponse);
			}).error(function(deleteError){
				reject(deleteError);
			});
		});
	};

	let editBookFB = function(editBookId){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/bookcase/${editBookId.id}.json`, JSON.stringify({
				image: editBookId.image,
				title: editBookId.title,
				author: editBookId.author,
				genre: editBookId.genre,
				isbn: editBookId.isbn,
				description: editBookId.description,
				toWho: editBookId.toWho,
				notes: editBookId.notes,
				uid: editBookId.uid
				})
			)
			.success(function(editBookResponse){
				resolve(editBookResponse);
			})
			.error(function(editBookError){
				reject(editBookError);
			});
		});
	};



	return{
		getBookFB:getBookFB,
		postBookFB:postBookFB,
		getSingleBook:getSingleBook,
		deleteBookFB:deleteBookFB,
		editBookFB:editBookFB
	};
});