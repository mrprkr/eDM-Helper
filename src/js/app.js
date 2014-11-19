//App for eDM helper
angular.module('app',['ngRoute', 'firebase'])
	
	.config(function($routeProvider) {
	  $routeProvider
	    .when('/', {
	      controller:'mainController',
	      templateUrl:'home.html'
	    })

	    .when('/preview', {
	      controller:'mainController',
	      templateUrl:'preview.html'
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


	.controller('mainController', function($scope, $firebase){
		var ref = new Firebase("https://edmaker.firebaseio.com");
		var sync = $firebase(ref);
		var syncObject = sync.$asObject();
		syncObject.$bindTo($scope, "data");
		// console.log(syncObject);

		$scope.isEditing = false;
		$scope.setEditing = function(value){
			$scope.isEditing = value;
		}

		$scope.addCampaign = function(campaign){
			$scope.data.campaigns.push({campaigns: campaign})
			console.log($scope.data);
		}
	})

	.controller('cheatsheetController', function($scope){
		$scope.introduction = "first Intro";
	})