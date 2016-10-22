'use strict';

nycParcels.controller('parcelController', ['$scope', '$routeParams', '$http', '$timeout', function($scope, $routeParams, $http, $timeout) {
	$scope.id = $routeParams.id;
	$scope.isLoading = true;
	$scope.messages = { };
	$scope.parcel = { };
	$scope.streetViewSRC = '';
	$scope.bgimg = undefined;

	$scope.init = function init() {
			$http.get('/api/parcel/' + $scope.id)
			.then(function(response) {
				if (response.data.length  < 1) {
					$scope.messages.empty = true;
				} else {
					console.log("Parcel Response -> ", response);
					$timeout(function() {
						$scope.parcel = response.data;
		    		}, 0);	
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
	}

	$scope.$watch('parcel', function() {
		if ($scope.parcel.Address !== undefined && $scope.parcel.ZipCode !== undefined) {
			$scope.streetViewSRC = 'https://maps.googleapis.com/maps/api/streetview?size=700x500&location=' + $scope.parcel.Address + ', NY' + '&fov=90&key=AIzaSyBGhQPgh9wK18zw3qrABXfObBW1dSf2PtU';
		}
	});

}]);

// nycParcels.directive('map', function() {
// 	return {
// 		restrict: 'E',
// 		template: '<div></div>',
// 		replace: true,
// 		link: function(scope, element, attrs) {
// 		    scope.$watch('parcel', function() {
// 		    	if (scope.parcel.Address !== undefined && scope.parcel.ZipCode !== undefined) {
// 		    		var address = scope.parcel.Address + ", NY, " + scope.parcel.ZipCode;
// 		    		var geocoder = new google.maps.Geocoder();

// 					   geocoder.geocode( {'address': address}, function(results, status) {
// 					      if (status === google.maps.GeocoderStatus.OK) {
// 					        var XCoord =results[0].geometry.location.lat();
// 					        var YCoord =results[0].geometry.location.lng();
// 					      	var LatLng = new google.maps.LatLng(XCoord, YCoord);
// 						    var panoramaOptions = 
// 							{
// 					              position: LatLng,
// 					              pov: {heading: 165, pitch: 0},
// 					              zoom: 1
// 					        };
// 				        	var panorama = new google.maps.StreetViewPanorama(document.getElementById(attrs.id), panoramaOptions);
// 					      } else {
// 					        console.log("Geocode was not successful for the following reason: " + status);
// 					      }
// 					    });
// 		    	}
// 		    });
// 		}
// 	};
// });
