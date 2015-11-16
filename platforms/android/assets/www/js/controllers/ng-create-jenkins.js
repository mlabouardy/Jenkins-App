
angular.module('starter.controllers', ['ngCookies','ionic'])
.controller('createCtrl',function($scope, $rootScope, $state, Database){
		$scope.jenkinsurl="http://";
		$scope.insert=function(name, url){
			Database.insert(name, url);
    		$rootScope.url=$scope.url;
    		$state.go('home');
		}
});