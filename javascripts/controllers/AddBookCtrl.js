"use strict";

bookcase.controller("AddBookCtrl", function($scope, $rootScope, $location, BookFactory){

	$scope.newBook = {};

	$scope.submitNewBook = function(){
		$scope.newBook.uid = $rootScope.user.uid;
		BookFactory.postBookFB($scope.newBook).then(function(bookId){
			$location.url("/bookcase/home");
			$scope.newBook = {};
		});
	};
});	