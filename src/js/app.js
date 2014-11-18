//App for eDM helper
angular.module('app',['ngRoute'])
	
	.config(function($routeProvider) {
	  $routeProvider
	    .when('/', {
	      controller:'mainController',
	      templateUrl:'home.html'
	    })

	    .when('/edit',{
	    	controller:'mainController',
	    	templateUrl:'edit.html'
	    })
	    .when('/cheatsheet',{
	    	controller:'cheatsheetController',
	    	templateUrl:'cheatsheet.html'
	    })
	    .otherwise({
	      redirectTo:'/'
	    });
	})

	.controller('mainController', function($scope){
		$scope.test = "hello world";
		$scope.introduction = "First Introduction binded from angular";
	})

	.controller('cheatsheetController', function($scope){
		$scope.introduction = "first Intro";
	})