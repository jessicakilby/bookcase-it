"use strict";

bookcase.controller("NavbarCtrl", function($scope, $rootScope){ 
	
	$scope.navTitles = [
	{
		name:"Logout",
		url: "#/logout"
	},
	{
		name:"Search",
		url:"#/bookcase/search"
	},
	{
		name:"Wishlist",
		url:"#/bookcase/wishlist"
	},
	// {
	// 	name:"Add Book",
	// 	url: "#/bookcase/add"
	// },
	{
		name:"Bookcase",
		url:"#/bookcase/home"
	}
	];
});
