angular.module('starter.services', [])
/*
--------------------------------------------------------
                 ALERTS
--------------------------------------------------------*/
.factory('Alerts', function($http,ApiEndpoint) {
 // Might use a resource here that returns a JSON array
 var alerts = [];  
 return {
   all: function() {
     return $http.get(ApiEndpoint.url+'/alerts')
     .success(function(response){
       alerts = response;
       return response;
     }).error(function(data,status,headers,config){
       console.log(data)
       console.log(status)
       console.log(headers)
       console.log(config)
       return null;
     });
   },
   get: function(alertId) {
     return $http.get(ApiEndpoint.url + '/alerts/'+alertId)
     .success(function(response){
       return response;
     }).error(function(data,status,headers,config){
       console.log(data)
       console.log(status)
       console.log(headers)
       console.log(config)
       return null;
     });
   },
   remove: function(alertId) {
     return $http.delete(ApiEndpoint.url + '/alerts/'+alertId)
     .success(function(response){
       console.log(response);
       return response;
     }).error(function(data,status,headers,config){
       console.log(data)
       console.log(status)
       console.log(headers)
       console.log(config)
       return null;
     });
   },
   new: function(alert){
     return $http.post(ApiEndpoint.url+'/alerts',alert)
     .success(function(response){
       console.log(response);
       return response;
     }).error(function(data,status,headers,config){
       console.log(data)
       console.log(status)
       console.log(headers)
       console.log(config)
       return null;
     });
 },
 edit: function(alert){
   return $http.update(ApiEndpoint.url + '/alerts/'+alert.id, alert)
   .success(function(response){
       console.log(response);
       return response;
     }).error(function(data,status,headers,config){
       console.log(data)
       console.log(status)
       console.log(headers)
       console.log(config)
       return null;
     });
   }
 };
})

.directive('hideTabs', function($rootScope) {
   return {
       restrict: 'A',
       link: function(scope, element, attributes) {
           scope.$watch(attributes.hideTabs, function(value){
               $rootScope.hideTabs = value;
           });            scope.$on('$destroy', function() {
               $rootScope.hideTabs = false;
           });
       }
   };
});