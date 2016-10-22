'use strict';

nycParcels.controller('boroughSearchController', ['$scope', '$route', '$rootScope', '$http', '$location', '$timeout', 'SearchData', 'PaginationService', function($scope, $route, $rootScope, $http, $location, $timeout, SearchData, PaginationService) {


	$scope.borough = $route.current.borough || "Error";

	$rootScope.$emit("contentLoaded", { name: $scope.borough });
	$scope.bgimg = "images/" + $scope.borough.replace(/\s+/g, '') + ".jpg";

	$scope.search =  SearchData.getForm()? SearchData.getForm().Borough === $scope.boroughsDictionary[$scope.borough]? SearchData.getForm() : { "Borough": $scope.boroughsDictionary[$scope.borough] } : { "Borough": $scope.boroughsDictionary[$scope.borough] };
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
			if (Object.keys($scope.search).length > 1) {
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
				    	PaginationService.setNewPageNumber(undefined);
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