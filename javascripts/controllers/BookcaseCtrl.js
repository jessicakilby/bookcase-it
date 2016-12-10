"use strict";

bookcase.controller("BookcaseCtrl", function($scope, $rootScope, BookFactory){

	$scope.bookcase = [];
	
	let getBooks = function(){
		BookFactory.getBookFB($rootScope.user.uid)
		.then(function(booksFromFB){
			$scope.bookcase = booksFromFB;
		});
	};
	getBooks();

	$scope.deleteBook = function(bookId){
		console.log("delete book", bookId);
		BookFactory.deleteBookFB(bookId).then(function(response){
			getBooks();
		});
	};

});