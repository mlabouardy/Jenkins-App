

angular.module('starter.services', ['ngCookies','ionic','ngCordova'])
.factory('Jenkins',function($http){
	return {
		getProjects: function (url) {
			return $http.get(url+'/api/json?depth=1');
		},
		buildProject:function(url, name){
			return $http.get(url+'/job/'+name+'/build');
		},
		deleteProject:function(url, name){
			return $http.post(url+'/job/'+name+'/doDelete');
		},
		enableProject:function(url, name){
			return $http.post(url+'/job/'+name+'/enable');
		},
		disableProject:function(url, name){
			return $http.post(url+'/job/'+name+'/disable');
		}
	};
})
.factory('SqliteService',function($ionicPlatform, $cordovaSQLite){
	var db;
	return{
		init:function(){
			$ionicPlatform.ready(function() {
				db = $cordovaSQLite.openDB("my.db");
			    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS jenkins (id integer primary key, name text, url text)");
			});
			return db;
		}
	};
})
.factory('Database', function(SqliteService, $cordovaSQLite, $state){
	//var db=SqliteService.init();
	var items=[];
	return{
		insert:function(name,url){
			items.push({
				name:name,
				url:url
			});
			console.log(items);
		},
		select:function(){
			return items;
		}
	};
});