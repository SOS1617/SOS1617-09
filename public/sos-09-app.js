angular.module("manager-app",["ngRoute"]).config(function($routeProvider){
    
    
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    })
    .when("/API/ApiLuis",{
        templateUrl : "list.html",
        controller : "ListController"
    });
    
     console.log("APP INIT");
     
     
});
   