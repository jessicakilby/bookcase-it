"use strict";

bookcase.controller("AddBookCtrl", function($scope, $rootScope, $routeParams, $location, BookFactory, ApiFactory){

	$scope.newBook = {};
	$scope.bookChoice = {};
	let BookId = $routeParams.id;


	ApiFactory.getSingleBookChoice(BookId).then(function(singleBook){
		console.log("singleBook", singleBook);
		console.log("singleBook", singleBook.data.items[0]);
		let selectedBook = singleBook.data.items[0];
		$scope.newBook = {
			image: selectedBook.volumeInfo.imageLinks.thumbnail,
			title: selectedBook.volumeInfo.title,
			author: selectedBook.volumeInfo.authors[0],
			genre: selectedBook.volumeInfo.categories[0],
			isbn: selectedBook.volumeInfo.industryIdentifiers[1].identifier,
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
	
});	

