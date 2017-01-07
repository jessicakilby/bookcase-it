"use strict";

bookcase.controller("AddBookCtrl", function($scope, $rootScope, $routeParams, $location, BookFactory, ApiFactory, WishFactory){

	$scope.newBook = {};
	$scope.bookChoice = {};
	let BookId = $routeParams.id;


	ApiFactory.getSingleBookChoice(BookId).then(function(singleBook){
		console.log("ApiFactory singleBook", singleBook.data.items[0]);
		let selectedBook = singleBook.data.items[0];
		$scope.newBook = {
			image: selectedBook.volumeInfo.imageLinks.thumbnail,
			title: selectedBook.volumeInfo.title,
			author: selectedBook.volumeInfo.authors[0],
			genre: selectedBook.volumeInfo.categories[0],
			isbn: selectedBook.volumeInfo.industryIdentifiers[0].identifier,
			description: selectedBook.volumeInfo.description,
			googleId: selectedBook.id,
			uid: $rootScope.user.uid
		};
		singleBook.id = BookId;
		$scope.bookChoice = singleBook;
	});

	$scope.submitNewBook = function(){
		// $scope.newBook.uid = $rootScope.user.uid;
		BookFactory.postBookFB($scope.newBook).then(function(bookId){
			$location.url("/bookcase/home");
			$scope.newBook = {};
		});
	};

// 	$scope.newBook = {};
// 	$scope.bookWishChoice = {};
// 	let BookWishId = $routeParams.id;

// 	WishFactory.getSingleBookWish(BookWishId).then(function(singleBook){
// 		console.log("WishFactory singleBook", singleBook);
// 		let selectedBook = singleBook;
// 		$scope.newBook = {
// 			image: selectedBook.url,
// 			title: selectedBook.title,
// 			author: selectedBook.author,
// 			genre: selectedBook.genre,
// 			isbn: selectedBook.isbn,
// 			description: selectedBook.description,
// 			googleId: selectedBook.id,
// 			uid: $rootScope.user.uid
// 		};
// 		singleBook.id = BookWishId;
// 		$scope.bookWishChoice = singleBook;
// 	});

// 	$scope.submitNewBookWish = function(){
// 		// $scope.newBook.uid = $rootScope.user.uid;
// 		WishFactory.postWishlistFB($scope.newBook).then(function(bookId){
// 			$location.url("/bookcase/wishlist");
// 			$scope.newBook = {};
// 		});
// 	};
	
// });	

// image: newBook.url,
// title: newBook.title,
// author: newBook.author,
// genre: newBook.genre,
// isbn: newBook.isbn,
// worth: newBook.worth,
// loanedOut: newBook.loanedOut,
// toWho: newBook.toWho,
// notes: newBook.notes,
// uid: newBook.uid

