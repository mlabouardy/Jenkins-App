
angular.module('starter.controllers', ['ngCookies','ionic'])
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
	});