"use strict";

bookcase.controller("BookcaseCtrl", function($scope, $rootScope, $location, $routeParams, BookFactory){

	$scope.bookcase = [];
	
	let getBooks = function(){
		BookFactory.getBookFB($rootScope.user.uid)
		.then(function(booksFromFB){
			console.log("books from fb", booksFromFB);
			$scope.bookcase = booksFromFB;
		});
	};
	getBooks();

	$scope.deleteBook = function(bookId){
		console.log("delete book", bookId);
		BookFactory.deleteBookFB(bookId)
		.then(function(response){
			getBooks();
		});
	};

	// $scope.editBook = function(bookId){
	// 	console.log("editBook here");

	// 	$location.url("/bookcase/editPrev/{{bookId}}");
	// };

	$scope.loanedOutChbx = function(checkbox){
		console.log("checkbox clicked");
		BookFactory.editBookFB(checkbox)
		.then(function(response){});
	};

});