"use strict";

let isAuth = (AuthFactory)=>new Promise((resolve, reject)=>{
	if(AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

