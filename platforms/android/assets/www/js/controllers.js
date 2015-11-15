
angular.module('starter.controllers', ['ngCookies','ionic','ngCordova'])
    .config(function($stateProvider, $urlRouterProvider){
    	 $stateProvider
		    .state('home', {
		      url: "/",
		      templateUrl: "templates/list.html",
		      controller: "homeCtrl"
		    })
		    .state('info', {
		      url: "/info",
		      templateUrl: "templates/info.html",
		      controller: "infoCtrl"
		    })
		    .state('create', {
		      url: "/create",
		      templateUrl: "templates/main.html",
		      controller: "createCtrl"
		    });
		    $urlRouterProvider.otherwise("/");;
    })
    .controller('homeCtrl',function($scope, $cordovaSQLite){
		    
	
    	$scope.items=[];
	    var query = "SELECT * FROM jenkins";
	        $cordovaSQLite.execute(db, query, []).then(function(res) {
	            if(res.rows.length > 0) {
	            	for(var i=0;i<res.rows.length;i++){
		            	$scope.items.push({
		            		name: res.rows.item(i).name,
		            		url: res.rows.item(i).url
		            	});
	            	}
	            } else {
	                console.log("No results found");
	            }
	        }, function (err) {
	            console.error(err);
	        });
    })
	.controller('createCtrl',function($scope, $rootScope, $state, $cordovaSQLite){
    
		$scope.jenkinsurl="http://";
		console.log('ok');
		$scope.insert = function(name, url) {
	        var query = "INSERT INTO jenkins (name, url) VALUES (?,?)";
	        $cordovaSQLite.execute(db, query, [name, url]).then(function(res) {
	            console.log("INSERT ID -> " + res.insertId);
	            $rootScope.url=url;
			$state.go('home');
        	}, function (err) {
            	console.error(err);
        	});
    	}
		
	})
	.controller('infoCtrl',function($scope, Jenkins){
		Jenkins.getProjects().success(function(data){
			 $scope.jobs=[];
   		for(var i=0;i<data.jobs.length;i++){
   			var color;
   			if(data.jobs[i].color=="yellow"){
   				color="<span class='badge badge-energized'>Unstable</span>";
   			}else if(data.jobs[i].color=="blue"){
   				color="<span class='badge badge-balanced'>Success</span>";
   			}else{
   				color="<span class='badge badge-dark'>Not built</span>";
   			}
   			$scope.jobs.push({
   				name:data.jobs[i].name,
   				color:color
   			})
   		}
		});
	})