'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupCtrl',
		templateUrl: '/browser/app/signup/signup.html'
	});
});