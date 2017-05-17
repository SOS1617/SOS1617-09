/*global angular*/
angular.module("sos09-app",["ngRoute"]).config(function($routeProvider){
    
    
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    }).when("/analytics",{
        templateUrl : "/analytics/analytics.html"
    })
    //Luis
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
    }).when("/analytics/ticsathome/integration",{
        templateUrl : "/analytics/ticsathome/wages&ticsathome.html",
        controller : "WagesController"
    }).when("/proxy/ticsathome",{
        templateUrl : "/analytics/ticsathome/proxyTic.html",
        controller : "proxyTicsController"
    })
    
    //Manuel
    .when("API/ApiManuel",{
        templateUrl : "index.html",
        controller : "hiv-ctrl.js"
    })
    
    //Verónicas
    .when("/internetandphones",{
        templateUrl : "/internetstats-manager/listv.html",
        controller : "ListControllerv"
    }).when("/internetandphones/edit/:country",{
        templateUrl : "/internetstats-manager/editv.html",
        controller : "EditControllerv"
    }).when("/analytics/internetstats/widget",{
        templateUrl : "/analytics/internetstats/widget.html",
        controller : "InternetStatsWidgets"
    }).when("/proxy/internetstats",{
        templateUrl : "/analytics/internetstats/integration.html",
        controller : "ProxyCtroller"
    }).when("/pisaResult/internetstats",{
        templateUrl : "/analytics/internetstats/integration2.html",
        controller : "Cotroller"
    });
     console.log("APP INIT");
     
    
});
