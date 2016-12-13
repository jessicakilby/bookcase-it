"use strict";

bookcase.controller("AddBookCtrl", function($scope, $rootScope, $routeParams, $location, BookFactory, ApiFactory){

	$scope.newBook = {};
	$scope.bookChoice = {};
	let BookId = $routeParams.id;


	ApiFactory.getSingleBookChoice(BookId).then(function(bookChoice){
		bookChoice.id = BookId;
		$scope.newBook = bookChoice;
	});

	$scope.submitNewBook = function(){
		$scope.newBook.uid = $rootScope.user.uid;
		BookFactory.postBookFB($scope.newBook).then(function(bookId){
			$location.url("/bookcase/home");
			$scope.newBook = {};
		});
	};
	
});	