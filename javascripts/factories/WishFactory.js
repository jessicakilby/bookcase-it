"use strict";

bookcase.factory("WishFactory", function($q, $http, FIREBASE_CONFIG){

	let getWishlistFB = function(userId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/wishlist.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(getBookResponse){
				let wishlist = [];
				Object.keys(getBookResponse).forEach(function(key){
					getBookResponse[key].id = key;
					wishlist.push(getBookResponse[key]);
				});
				resolve(wishlist);
			}).error(function(errorResponse){
				reject(errorResponse);
			});
		});
	};

	let postWishlistFB = function(newBookWish){
		return $q((resolve, reject)=>{
			$http.post(`${FIREBASE_CONFIG.databaseURL}/wishlist.json`, JSON.stringify({
				image: newBookWish.image,
				title: newBookWish.title,
				author: newBookWish.author,
				genre: newBookWish.genre,
				isbn: newBookWish.isbn,
				description: newBookWish.description,
				loanedOut: newBookWish.loanedOut,
				toWho: newBookWish.toWho,
				notes: newBookWish.notes,
				googleId: newBookWish.id,
				uid: newBookWish.uid
			}))
			.success(function(postBookResponse){
				resolve(postBookResponse);
			})
			.error(function(postBookError){
				reject(postBookError);
			});
		});
	};

	let getSingleBookWish = function(wishId){
		return $q((resolve, reject)=>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/wishlist/${wishId}.json`)
			.success(function(getSingleBookResponse){
				resolve(getSingleBookResponse);
			})
			.error(function(singelBookError){
				reject(singelBookError);
			});
		});
	};

	let deleteBookWishFB = function(wishId){
		return $q((resolve, reject)=>{
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/wishlist/${wishId}.json`)
			.success(function(deleteResponse){
				resolve(deleteResponse);
			}).error(function(deleteError){
				reject(deleteError);
			});
		});
	};

	let editBookWishFB = function(editBookWishId){
		return $q((resolve, reject)=>{
			$http.put(`${FIREBASE_CONFIG.databaseURL}/wishlist/${editBookWishId.id}.json`, JSON.stringify({
				image: editBookWishId.image,
				title: editBookWishId.title,
				author: editBookWishId.author,
				genre: editBookWishId.genre,
				isbn: editBookWishId.isbn,
				description: editBookWishId.description,
				loanedOut: editBookWishId.loanedOut,
				toWho: editBookWishId.toWho,
				notes: editBookWishId.notes,
				googleId: editBookWishId.id,
				uid: editBookWishId.uid
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
		getWishlistFB:getWishlistFB,
		postWishlistFB:postWishlistFB,
		getSingleBookWish:getSingleBookWish,
		deleteBookWishFB:deleteBookWishFB,
		editBookWishFB:editBookWishFB
	};
});