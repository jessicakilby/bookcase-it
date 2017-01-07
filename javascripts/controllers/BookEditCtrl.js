"use strict";

bookcase.controller("BookEditCtrl", function($scope, $routeParams, $location, BookFactory){

	$scope.newBook = {};
	let bookId = $routeParams.id;

	BookFactory.getSingleBook(bookId).then(function(singleBook){
		console.log("bookId BookEditCtrl", bookId);
		singleBook.id = bookId;
		$scope.newBook = singleBook;
	});

	$scope.submitNewBook = function(){
		BookFactory.editBookFB($scope.newBook).then(function(response){
			$scope.newBook = {};
			$location.url("/bookcase/home");
		});
	};



});