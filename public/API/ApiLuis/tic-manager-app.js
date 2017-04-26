angular.module("TicsManagerApp",["ngRoute"]).config(function($routeProvider){
    
    
    
    $routeProvider
    .when("/",{
        templateUrl : "list.html",
        controller : "ListController"
    })
    .when("/edit/:country",{
        templateUrl : "edit.html",
        controller : "EditController"
    });
    
     console.log("APP INIT");
     
     
});
   