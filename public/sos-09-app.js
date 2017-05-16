/*global angular*/
angular.module("sos09-app",["ngRoute"]).config(function($routeProvider){
    
    
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    }).when("/analytics",{
        templateUrl : "/analytics/analytics.html"
    })
    .when("/ticsathome",{
        templateUrl : "/ticsathome-manager/list.html",
        controller : "ListController"
    }).when("/ticsathome/edit/:country",{
        templateUrl : "/ticsathome-manager/edit.html",
        controller : "EditController"
    }).when("/analytics/ticsathome/geo",{
        templateUrl : "/analytics/ticsathome/geo.html",
        controller : "GeoController"
    }).when("/analytics/ticsathome/chart",{
        templateUrl : "/analytics/ticsathome/chart.html",
        controller : "ChartController"
    }).when("/analytics/ticsathome/chartist",{
        templateUrl : "/analytics/ticsathome/chartist.html",
        controller : "chartistController"
    }).when("API/ApiManuel",{
        templateUrl : "index.html",
        controller : "hiv-ctrl.js"
    }).when("API/ApiVero",{
        templateUrl : "internetStats.html",
        controller : "list-cntrl-internet.js"
    });
    
     console.log("APP INIT");
     
     
});
   