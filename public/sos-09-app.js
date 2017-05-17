/*global angular*/
angular.module("sos09-app",["ngRoute"]).config(function($routeProvider){
    
    
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    })
    .when("/ticsathome",{
        templateUrl : "/ticsathome-manager/list.html",
        controller : "ListController"
   
    }).when("/ticsathome/edit/:country",{
        templateUrl : "/ticsathome-manager/edit.html",
        controller : "EditController"
  
    }).when("/hiv-stats",{
        templateUrl : "/API/ApiManuel/list.html",
        controller : "listCtrl"
   
    }).when("/hiv-stats/edit/:name/:year",{
        templateUrl : "/API/ApiManuel/edit.html",
        controller : "editCtrl"
  
    }).when("API/ApiVero",{
        templateUrl : "internetStats.html",
        controller : "list-cntrl-internet.js"
    });
    
     console.log("APP INIT");
     
     
});
   