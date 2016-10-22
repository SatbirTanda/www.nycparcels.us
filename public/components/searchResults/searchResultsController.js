'use strict';

nycParcels.controller('searchResultsController', ['$scope', '$location', 'SearchData', 'PaginationService', function($scope, $location, SearchData, PaginationService) {
	$scope.parcels = SearchData.getResponse();
	$scope.bgimg = undefined;

	$scope.maxSize = 100;
	$scope.currentPage = PaginationService.currentPageNumber || 1;
	$scope.totalItems = $scope.parcels.length || 0;

	$scope.selectParcel = function selectParcel(parcel) {
		// console.log(parcel);
		$location.path('/parcel/' + parcel._id);
	};

	$scope.numPages = function () {
		return Math.ceil($scope.parcels.length / $scope.maxSize);
	};

	$scope.$watch("currentPage",function(value) {
    	PaginationService.setNewPageNumber(value);
	});

}]);
