angular.module("manager-app",["ngRoute"]).config(function($routeProvider){
    
    
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    })
    .when("/API/ApiLuis",{
        templateUrl : "list.html",
        controller : "ListController"
    }).when("API/ApiManuel",{
        templateUrl : "index.html",
        controller : "hiv-ctrl.js"
    }).when("API/ApiVero",{
        templateUrl : "internetStats.html",
        controller : "list-cntrl-internet.js"
    });
    
     console.log("APP INIT");
     
     
});
   