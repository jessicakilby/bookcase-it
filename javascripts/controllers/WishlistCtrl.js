"use strict";

bookcase.controller("WishlistCtrl", function($scope, $rootScope, $routeParams, $location, BookFactory, ApiFactory, WishFactory){

	$scope.wishlist = [];

	let getBookWishlist = function(){
		WishFactory.getWishlistFB($rootScope.user.uid)
		.then(function(booksFromFB){
			$scope.wishlist = booksFromFB;
		});
	};
	getBookWishlist();

	$scope.deleteBookWish = function(bookId){
		console.log("delete book", bookId);
		WishFactory.deleteBookWishFB(bookId).then(function(response){
			getBookWishlist();
		});
	};
	
});	

