"use strict";

bookcase.controller("NavbarCtrl", function($scope, $rootScope){ 
	
	$scope.navTitles = [
	{
		name:"Logout",
		url: "#/logout"
	},
	{
		name:"Add Book",
		url: "#/bookcase/add"
	},
	{
		name:"Bookcase",
		url:"#/bookcase/home"
	}
	];
});
