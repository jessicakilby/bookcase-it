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
			controller: "ContactListCtrl",
			resolve: {isAuth}
		})
		.otherwise("/auth");
});