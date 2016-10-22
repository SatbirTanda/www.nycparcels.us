'use strict';

var nycParcels = angular.module('nycParcels', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngResource', 'ui.bootstrap']);

nycParcels.config(function($mdIconProvider, $mdThemingProvider, $routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');

    $mdIconProvider
		.defaultIconSet("images/svg/error.svg", 128)
		.icon("menu", "images/svg/menu.svg", 24)
		.icon("share", "images/svg/share.svg", 24)
		.icon("google_plus", "images/svg/google_plus.svg", 24)
		.icon("hangouts", "images/svg/hangouts.svg", 24)
		.icon("twitter", "images/svg/twitter.svg", 24)
		.icon("phone", "images/svg/phone.svg", 24)
		.icon("nyc", "images/svg/nyc.svg", 24)
		.icon("manhattan", "images/svg/manhattan.svg", 128)
		.icon("queens", "images/svg/queens.svg", 128)
		.icon("brooklyn", "images/svg/brooklyn.svg", 128)
		.icon("staten", "images/svg/staten.svg", 128)
		.icon("bronx", "images/svg/bronx.svg", 128)
		.icon("about", "images/svg/about.svg", 128)
		.icon("contact", "images/svg/contact.svg", 128)
		.icon("search", "images/svg/search.svg", 24);


    $mdThemingProvider.theme('default')
      .primaryPalette('green')
      .accentPalette('orange');

	$routeProvider.
        when('/nyc', {
            templateUrl: 'components/nycSearch/nycSearch.html',
            controller: 'nycSearchController'
        })
	    .when('/queens', {
            templateUrl: 'components/boroughSearch/boroughSearch.html',
            controller: 'boroughSearchController',
            borough: 'Queens'
        })
        .when('/brooklyn', {
            templateUrl: 'components/boroughSearch/boroughSearch.html',
            controller: 'boroughSearchController',
            borough: 'Brooklyn'
        })
        .when('/bronx', {
            templateUrl: 'components/boroughSearch/boroughSearch.html',
            controller: 'boroughSearchController',
            borough: 'The Bronx'
        })
        .when('/staten', {
            templateUrl: 'components/boroughSearch/boroughSearch.html',
            controller: 'boroughSearchController',
            borough: 'Staten Island'

        })
        .when('/manhattan', {
            templateUrl: 'components/boroughSearch/boroughSearch.html',
            controller: 'boroughSearchController',
            borough: 'Manhattan'
        })
        .when('/about', {
            templateUrl: 'components/about/about.html',
            controller: 'aboutController'
        })
        .when('/contact', {
            templateUrl: 'components/contact/contact.html',
            controller: 'contactController'
        })
        .when('/searchResults', {
            templateUrl: 'components/searchResults/searchResults.html',
            controller: 'searchResultsController'
        })
        .when('/parcel/:id', {
            templateUrl: 'components/parcel/parcel.html',
            controller: 'parcelController'
        })
        .otherwise({
        	redirectTo: '/nyc'
        });
});

nycParcels.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(){
        ga('send', 'pageview', $location.path());
    });
}]);

nycParcels.controller('indexController', ['$scope', '$mdSidenav', '$mdBottomSheet', '$location', function($scope, $mdSidenav, $mdBottomSheet, $location) {

    $scope.bgimg = "images/nyc.jpg";

	$scope.toggleList = function toggleList() {
		$mdSidenav('left').toggle();
	}

    $scope.redirectHome = function redirectHome() {
        $location.path('/');
    }

    $scope.boroughsDictionary = {
        "Queens": "QN",
        "Staten Island": "SI",
        "The Bronx": "BX",
        "Brooklyn": "BK",
        "Manhattan": "MN"
    };
    
}]);

nycParcels.factory('SearchData', function() {

    var form = undefined;
    var response = undefined;

    return {
        setForm: function(f) {
            form = f;
        },
        getForm: function() {
            return form;
        },
        setResponse: function(r) {
            response = r;
        },
        getResponse: function() {
            return response;
        }
    }
});

nycParcels.service('PaginationService', function(){
   var service = {};
   service.currentPageNumber = 1;

   service.setNewPageNumber = function(newPageNumber) {
      service.currentPageNumber = newPageNumber;
   };

   return service;
});