
angular.module('starter.controllers', ['ngCookies','ionic','ngCordova'])
    .config(function($stateProvider, $urlRouterProvider){
    	 $stateProvider
		    .state('home', {
		      url: "/",
		      templateUrl: "templates/list.html",
		      controller: "homeCtrl"
		    })
		    .state('info', {
		      url: "/info/?jenkinsurl",
		      templateUrl: "templates/info.html",
		      controller: "infoCtrl"
		    })
		    .state('create', {
		      url: "/create",
		      templateUrl: "templates/create.html",
		      controller: "createCtrl"
		    });
		    $urlRouterProvider.otherwise("/");;
    })
    .controller('homeCtrl',function($scope, Database, $state){
		$scope.items=Database.select();

		$scope.test=function(item){
			console.log('ok+++'+item.url);
			$state.go('info',{jenkinsurl:item.url});
		}
	})
	.controller('createCtrl',function($scope, $state, Database){
		$scope.url="http://";
		$scope.insert=function(name, url){
			Database.insert(name, url);
    		$state.go('home');
		}
	})
	.controller('infoCtrl',function($scope, Jenkins, $stateParams){
		console.log('test '+$stateParams.jenkinsurl);
		Jenkins.getProjects($stateParams.jenkinsurl).success(function(data){
			console.log('data '+data);
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
	});