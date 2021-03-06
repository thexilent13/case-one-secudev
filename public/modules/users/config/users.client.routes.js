'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('user-profile', {
			url: '/user-profile',
			templateUrl: 'modules/users/views/profile/user-profile.client.view.html'
		}).
		state('edit-profile', {
			url: '/edit-profile',
			templateUrl: 'modules/users/views/profile/edit-profile.client.view.html'
		}).
		state('change-password', {
			url: '/change-password',
			templateUrl: 'modules/users/views/profile/change-password.client.view.html'
		}).
		// state('accounts', {
		// 	url: '/settings/accounts',
		// 	templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		// }).
		state('signup', {
			url: '/register',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/login',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		});
		// state('forgot', {
		// 	url: '/password/forgot',
		// 	templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		// }).
		// state('reset-invalid', {
		// 	url: '/password/reset/invalid',
		// 	templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		// }).
		// state('reset-success', {
		// 	url: '/password/reset/success',
		// 	templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		// }).
		// state('reset', {
		// 	url: '/password/reset/:token',
		// 	templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		// });
	}
]);
