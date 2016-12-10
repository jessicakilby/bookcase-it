"use strict";

let isAuth = (AuthFactory)=>new Promise((resolve, reject)=>{
	if(AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

bookcase.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory){
	firebase.initializeApp(FIREBASE_CONFIG);
	$rootScope.$on("$routeChangeStart", function(event, currRoute, preRoute){
		let logged = AuthFactory.isAuthenticated();
		let appTo;
		if(currRoute.originalPath){
			appTo = currRoute.originalPath.indexOf("/auth") !== -1;
		}
		if(!appTo && !logged) {
			event.preventDefault();
			$location.path("/auth");
		}
	});
});

bookcase.config(function($routeProvider){
	$routeProvider
		.when("/auth", {
			templateUrl: "partials/auth.html",
			controller: "AuthCtrl"
		})
		.when("/bookcase/home", {
			templateUrl: "partials/bookcase-home.html",
			controller: "BookcaseCtrl",
			resolve: {isAuth}
		})
		.when("/bookcase/add", {
			templateUrl: "partials/add-book.html",
			controller: "AddBookCtrl",
			resolve: {isAuth}
		})
		.when("/bookcase/editPrev/:id", {
			templateUrl: "partials/edit-prev.html",
			controller: "EditPrevCtrl",
			resolve: {isAuth}
		})
		.when("/bookcase/edit/:id", {
			templateUrl: "partials/add-book.html",
			controller: "BookEditCtrl",
			resolve: {isAuth}
		})
		.when("/bookcase/search", {
			templateUrl: "partials/searchAPI.html",
			controller: "searchAPICtrl",
			resolve: {isAuth}
		})
		.when("/logout", {
			templateUrl: "partials/auth.html",
			controller: "AuthCtrl",
			resolve: {isAuth}
		})
		.otherwise("/auth");
});