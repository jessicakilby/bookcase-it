"use strict";

bookcase.controller("searchAPICtrl", function($scope, $rootScope, $location, BookFactory, ApiFactory){

	$scope.newBook = {};
	$scope.inputForSearch = {};
	$scope.searchResults = [];
	$scope.bookcase = [];

	let uid = $rootScope.user.uid;

	let getBooks = function(){
		BookFactory.getBookFB(uid).then(function(bookArray){
			$scope.bookcase = bookArray;
		});
	};
	getBooks();

	$scope.submitSearch = function(){
		ApiFactory.booksFromAPI($scope.inputForSearch).then(function(bookReturnFromSearch){
			console.log("bookReturnFromSearch", bookReturnFromSearch);
			$scope.searchResults = bookReturnFromSearch;
		});
	};


});