'use strict';

// Items controller
angular.module('items').controller('ItemsController', ['$scope', '$stateParams', '$location', '$http', '$window',
	'$timeout', 'Authentication', 'Items', 'FileUploader', 'Carts',
	function($scope, $stateParams, $location, $http, $window, $timeout,
			 Authentication, Items, FileUploader, Carts) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		// If user is signed in then redirect back home
		if (!$scope.authentication.user) $location.path('/');

		$scope.donate = function(amount) {
			$http.post('/items/create/donation', {amount: amount});
		};

		// Create new Item
		$scope.create = function() {
			// Create new Item object
			var item = new Items ({
				name: this.name,
				description: this.description,
				price: this.price,
				image: $scope.filename
			});

			// Redirect after save
			item.$save(function(response) {
				$location.path('items/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				$scope.image = '';
				$scope.price = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		// Remove existing Item
		$scope.remove = function(item) {
			if ( item ) {
				item.$remove();

				for (var i in $scope.items) {
					if ($scope.items [i] === item) {
						$scope.items.splice(i, 1);
					}
				}
			} else {
				$scope.item.$remove(function() {
					$location.path('items');
				});
			}
		};

		$scope.goToEditPage = function(item) {
			$location.path('store/item/' + item._id + '/edit');
		};

		// Update existing Item
		$scope.update = function() {
			var item = $scope.item;

			item.$update(function() {
				$location.path('store/item/' + item._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.viewItem = function(item) {
			$location.path('store/item/' + item._id);
		};

		// Find a list of Items
		$scope.find = function() {
			$scope.items = Items.query();
		};

		// Find existing Item
		$scope.findOne = function() {
			$scope.item = Items.get({
				itemId: $stateParams.itemId
			});
		};

		$scope.isAdmin = function() {
			if($scope.user.roles.indexOf('admin') === 0)
				return true;
			else
				return false;
		};

		$scope.isUser = function() {
			if($scope.user.roles.indexOf('user') === 0)
				return true;
			else
				return false;
		};

		$scope.addToCart = function(item) {
			$http.post('/cart/add/item', {item: item}).success(function(response) {
				console.log('Successfully, add item to cart.');
			});
			$location.path('carts');
			$window.location.reload();
		};
	}
]);
