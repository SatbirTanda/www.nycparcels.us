'use strict';

nycParcels.controller('contactController', ['$scope', '$rootScope', function($scope, $rootScope) {

	$rootScope.$emit("contentLoaded", { name: "Contact" });
	$scope.bgimg = undefined;

}]);