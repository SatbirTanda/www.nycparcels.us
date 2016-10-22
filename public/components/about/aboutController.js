'use strict';

nycParcels.controller('aboutController', ['$scope', '$rootScope', function($scope, $rootScope) {
	
	$rootScope.$emit("contentLoaded", { name: "About" });
	$scope.bgimg = undefined;

}]);