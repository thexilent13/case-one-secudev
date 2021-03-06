'use strict';

var UsersApp = angular.module('users');

UsersApp.controller('ProfileUserController', ['$scope', '$http',
	'$stateParams', '$location', 'Authentication', 'Users',
	function($scope, $http, $stateParams, $location, Authentication, Users) {

		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		var badges = Authentication.user.badges;
		console.log(badges);
		//for()
		//console.log($scope.found);

		$scope.find = function() {
			$http.post('/users/profile/badge/compute', {id: $scope.user._id}).success(function(response) {
				$scope.badges = response.badges;
			});
		};
	}
]);


UsersApp.controller('ProfileEditController', ['$scope',
	'$http', '$location', 'Users', 'Authentication', '$filter', '$window',
	function($scope, $http, $location, Users, Authentication, $filter, $window) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) {
			$location.path('/');
		}

		var gender = [
			'Male',
			'Female'
		];

		var salutation = [
			['Mr', 'Sir', 'Senior', 'Count'],
			['Miss', 'Ms', 'Mrs', 'Madame', 'Majesty', 'Seniora']
		];

		$scope.gender = gender;
		$scope.salutation = [];

		try {
			$scope.getSalutation = function () {
				var key;
				//console.log('Gender ' + $scope.user.gender);
				if($scope.user.gender === 'Male') {
					key = 0;
				}
				else if($scope.user.gender === 'Female') {
					key = 1;
				}
				//var key = $scope.gender.indexOf($scope.user.gender);
				var myNewOptions = salutation[key];
				$scope.salutation = myNewOptions;

				//console.log('Key = ' + key);
			};
		} catch(e) {
			console.log('Invalid Gender');
		}

		$scope.user.birthdate = $filter('date')($scope.user.birthdate, 'yyyy-MM-dd');

		$scope.editProfile = function(isValid) {
			var username = $scope.user.username;
			$http.post('/users/profile/update', $scope.user).success(function(response) {
				// If successful we assign the response to the global user model
				if (isValid) {
					$scope.success = $scope.error = null;
					var user = new Users($scope.user);

					user.$update(function(response) {
						$scope.user.username = username;
						$scope.success = true;
						Authentication.user = response;
					}, function(response) {
						$scope.error = response.data.message;
					});
				} else {
					$scope.submitted = true;
				}

				// And redirect to the index page
				$window.location.reload();
				$location.path('/user-profile');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Check if there are additional accounts
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$scope.passwordDetails.displayName = $scope.user.displayName;
			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
