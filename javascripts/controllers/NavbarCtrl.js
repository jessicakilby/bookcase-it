"use strict";

bookcase.controller("NavbarCtrl", function($scope, $rootScope){ 
	
	$scope.navTitles = [
	{
		name:"Logout",
		url: "#/logout"
	},
	{
		name:"Add Book",
		url: "#/pins/add"
	},
	{
		name:"Bookcase",
		url:"#/pins/home"
	}
	];
});
