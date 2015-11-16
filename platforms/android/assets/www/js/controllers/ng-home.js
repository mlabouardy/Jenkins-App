

angular.module('starter.controllers', ['ngCookies','ionic'])
.controller('homeCtrl',function($scope, Database){
		$scope.items=Database.select();
});