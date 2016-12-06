"use strict";

bookcase.controller("EditPrevCtrl", function($scope, $routeParams, BookFactory){

	$scope.selectedBook = {};
	let bookId = $routeParams.id;

	BookFactory.getSingleBook(bookId)
	.then(function(singleBook){
		singleBook.id = bookId;
		console.log("EditPrevCtrl bookId", bookId);
		$scope.selectedBook = singleBook;
	});

});