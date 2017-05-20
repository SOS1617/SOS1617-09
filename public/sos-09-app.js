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
<<<<<<< HEAD
  
    }).when("/hiv-stats",{
        templateUrl : "/API/ApiManuel/list.html",
        controller : "listCtrl"
   
    }).when("/hiv-stats/edit/:name/:year",{
        templateUrl : "/API/ApiManuel/edit.html",
        controller : "editCtrl"
  
    }).when("API/ApiVero",{
        templateUrl : "internetStats.html",
        controller : "list-cntrl-internet.js"
=======
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
    }).when("/internetandphones",{
        templateUrl : "/internetstats-manager/listv.html",
        controller : "ListControllerv"
    }).when("/internetandphones/edit/:country",{
        templateUrl : "/internetstats-manager/editv.html",
        controller : "EditControllerv"
    }).when("/analytics/internetstats/widget",{
        templateUrl : "/analytics/internetstats/widget.html",
        controller : "InternetStatsWidgets"
>>>>>>> fa276d06c48e32419bb298c018f804eb6a47c7ff
    });
     console.log("APP INIT");
     
    
});
