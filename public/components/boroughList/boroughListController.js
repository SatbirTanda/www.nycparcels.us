'use strict';

nycParcels.controller('boroughListController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {

    $scope.items = [
        {
            num: 1,
            name: 'New York City',
            avatar: 'nyc'
        },
        {
            num: 4,
            name: 'Manhattan',
            avatar: 'manhattan'
        },
        {
            num: 6,
            name: 'Queens',
            avatar: 'queens'
        },
        {
            num: 3,
            name: 'Brooklyn',
            avatar: 'brooklyn'
        },
        {
            num: 5,
            name: 'Staten Island',
            avatar: 'staten'
        },
        {
            num: 2,
            name: 'The Bronx',
            avatar: 'bronx'
        },
        {
            num: 7,
            name: 'About',
            avatar: 'about'
        },
        {
            num: 8,
            name: 'Contact',
            avatar: 'contact'
        }
    ];

	$scope.selected = function() {for (var i = $scope.items.length - 1; i >= 0; i--) {
        if($scope.items[i].num === 1) return $scope.selected = $scope.items[i];
    }}();

	$scope.selectItem =  function selectItem(item) { 
		$location.path('/' + item.avatar);
	};

    $rootScope.$on('contentLoaded', function(event, args) {
        event.stopPropagation();
        for (var i = $scope.items.length - 1; i >= 0; i--) {
            if($scope.items[i].name === args.name) $scope.selected = $scope.items[i];
        }
    });

}]);