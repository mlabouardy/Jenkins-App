
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
		    .state('details', {
		      url: "/details/?url?name",
		      templateUrl: "templates/details.html",
		      controller: "detailsCtrl"
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

		$scope.getInfo=function(item){
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
	.controller('detailsCtrl',function($scope,  $stateParams, Jenkins, $ionicPopup){
		console.log('ok test '+$stateParams.name+" "+$stateParams.url);
		$scope.builds=[];
		Jenkins.getProjects($stateParams.url).success(function(data){
				var jobs=data.jobs;
				for(var i=0;i<jobs.length;i++){
					if(jobs[i].displayName==$stateParams.name){
						$scope.job=jobs[i];
						if($scope.job.description==""){
							$scope.job.description="No description available";
						}
					}
				}
		});

		$scope.build=function(){
			var confirmPopup = $ionicPopup.confirm({
			     title: $stateParams.name,
			     template: 'Are you sure you want to build this project?',
			     cancelText: 'No',
        		 okText: 'Yes',
        		 okType: 'button-balanced',
        		 cancelType:'button-assertive'
			   });
			   confirmPopup.then(function(res) {
			     if(res) {
			     	Jenkins.buildProject($stateParams.url, $stateParams.name).success(function(){	
			       		console.log('You are sure');
					});
			     } else {
			       console.log('You are not sure');
			     }
			   });
			
		}
		
	})
	.controller('infoCtrl',function($scope, Jenkins, $stateParams, $state){
		Jenkins.getProjects($stateParams.jenkinsurl).success(function(data){
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

		$scope.getInfo=function(job){
			$state.go('details',{url: $stateParams.jenkinsurl,name: job.name});
		}
	});