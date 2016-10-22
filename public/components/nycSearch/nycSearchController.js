'use strict';

nycParcels.controller('nycSearchController', ['$scope', '$route', '$rootScope', '$http', '$location', '$timeout', 'SearchData', function($scope, $route, $rootScope, $http, $location, $timeout, SearchData) {

	$rootScope.$emit("contentLoaded", { name: "New York City" });

	$scope.search =  SearchData.getForm()? SearchData.getForm().Borough? { } : SearchData.getForm() : { };

	$scope.messages = { };

	$scope.isLoading = false;

	$scope.query = function(isValid) {
		// console.log("Search Query: ", $scope.search);
		if (isValid) {
			$scope.messages.empty = false;
			for(var key in $scope.search) {
				if ($scope.search.hasOwnProperty(key)) {
					if( ($scope.search[key] === null) || ($scope.search[key] === undefined) || ($scope.search[key] === '')) {
						delete $scope.search[key];
					}
				}
			}
			if (Object.keys($scope.search).length >= 1) {
				$scope.messages.error = false;
				console.log("Search Query: ", $scope.search);
				SearchData.setForm($scope.search);
			    $timeout(function() {
					$scope.isLoading = true;
			    }, 0);
				$http.post('/api/search', $scope.search)
				.then(function(response) {
					if (response.data.length  < 1) {
						$scope.messages.empty = true;
					} else {
						SearchData.setResponse(response.data);
						console.log("Response -> ", SearchData.getResponse());
						$location.path('/searchResults');
					}
				}, function(error) {
					console.log("Error -> ", error);	
				    $timeout(function() {
						$scope.messages.serverError = true;		    
				    }, 0);
				})
				.then(function(){
					$timeout(function() {
						$scope.isLoading = false;
			    	}, 0);					
				});
			} else {
				$scope.messages.error = true;
				$scope.searchForm.$setPristine();
				console.log("Please enter a parameter");
			}
		} else {
			console.log("Form is invalid");
		}
	};

}]);