
/*global angular*/

angular.module("sos09-app",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    }).when("/analytics",{
        templateUrl : "/analytics/analytics4.html",
        controller : "GrupalWidget"
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
    }).when("/analytics-ticsathome",{
        templateUrl : "/analytics/ticsathome/Graphs.html",
    })
   
        
    
    //Verónica
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
    }).when("/analytics-internetstats",{
        templateUrl : "/analytics/internetstats/Graphs.html",
    })
    
    
    //Manuel
    
    .when("/hiv-stats",{
        templateUrl : "/hiv-manager/list.html",
        controller : "listCtrl"
   
    }).when("/hiv-stats/edit/:name/:year",{
        templateUrl : "/hiv-manager/edit.html",
        controller : "editCtrl"
 
 
    }) .when("/analytics/hiv-stats/ejscharts",{
        templateUrl : "/analytics/hiv-stats/ejs.html",
        controller : "EJSChartsController"
   
    }).when("/proxy/hiv-stats",{
        templateUrl : "/analytics/hiv-stats/ext2proxy.html",
        controller : "ProxyCtrl"
        
        
    }).when("/analytics/hiv-stats/startups",{
        templateUrl : "/analytics/hiv-stats/ext1.html",
        controller : "CtrlExt"
    
        
        //GRUPAL 
    })//.when("/analytics", {
          //  templateUrl: "analytics/analytics.html",
         //   controller: "GrupalCtrl"

    
    
    
    ;
     console.log("APP INIT");
     
    
    
    });
