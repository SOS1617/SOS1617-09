
/*global angular*/

angular.module("sos09-app",["ngRoute"]).config(function($routeProvider){
    
    $routeProvider
    .when("/",{
        templateUrl : "home.html",
    }).when("/analytics",{
        templateUrl : "/analytics/analytics.html",
        controller : "GrupalWidget"
    }).when("/integrations",{
        templateUrl : "/integrations/integrations.html"
        
    }).when("/governance",{
        templateUrl : "/governance.html"
        
    }).when("/about",{
        templateUrl : "/about.html"
    
    //Luis
   }).when("/ticsathome",{
        templateUrl : "/ticsathome-manager/list.html",
        controller : "ListController"
   
    }).when("/ticsathome/edit/:country",{
        templateUrl : "/ticsathome-manager/edit.html",
        controller : "EditController"

  
    }).when("/analytics/ticsathome/mine",{
        templateUrl : "/analytics/ticsathome/mine.html", //Barras 
        controller : "MineController"
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
    }).when("/integrations-ticsathome/population",{
        templateUrl : "/analytics/ticsathome/population.html",
         controller : "PopulationController"
    }).when("/integrations-ticsathome/p",{
        templateUrl : "/analytics/ticsathome/p.html",
         controller : "PController"
    }).when("/integrations-ticsathome/G01",{
        templateUrl : "/integrations/ticsathomestats/integration-G01.html",
         controller : "G01Controller"
    }).when("/integrations-ticsathome/G02",{
        templateUrl : "/integrations/ticsathomestats/integration-G02.html",
         controller : "G02Controller"
    }).when("/integrations-ticsathome/G03",{
        templateUrl : "/integrations/ticsathomestats/integration-G03.html",
         controller : "G03Controller"
    })
   
        
    
    //Verónica
    .when("/internetandphones",{
        templateUrl : "/internetstats-manager/listv.html",
        controller : "ListControllerv"
    }).when("/internetandphones/edit/:country",{
        templateUrl : "/internetstats-manager/editv.html",
        controller : "EditControllerv"
    }).when("/integrations-internetstats/G01",{
        templateUrl : "/integrations/internetstats/integration.html",
        controller : "ProxyCtroller"
    }).when("/integrations-internetstats/G03",{
        templateUrl : "/integrations/internetstats/integration2.html",
        controller : "Cotroller"
    }).when("/analytics-internetstats",{
        templateUrl : "/analytics/internetstats/widget.html",
        controller : "InternetStatsWidgets"
    })
    
    
    //Manuel
    
    .when("/hiv-stats",{
        templateUrl : "/hiv-manager/list.html",
        controller : "listCtrl"
   
    }).when("/hiv-stats/edit/:name/:year",{
        templateUrl : "/hiv-manager/edit.html",
        controller : "editCtrl"
 
 
    }) .when("/hiv-stats/pruebaGeo",{
        templateUrl : "/analytics/hiv-stats/googleGeo.html",
        controller : "HivGeoController"
 
 
    }).when("/analytics/hiv-stats/ejscharts",{
        templateUrl : "/analytics/hiv-stats/ejs.html",
        controller : "EJSChartsController"
   
    }).when("/proxy/hiv-stats",{
        templateUrl : "/analytics/hiv-stats/ext2proxy.html",
        controller : "ProxyCtrl"
        
        
    }).when("/analytics/hiv-stats/startups",{
        templateUrl : "/analytics/hiv-stats/ext1.html",
        controller : "CtrlExt"
    
        
        
    }).when("/mashup",{
        templateUrl : "/analytics/hiv-stats/mashup.html",
        controller : "mashupCtrl"
    
        
        
    }).when("/proweb",{
        templateUrl : "/analytics/hiv-stats/proweb.html",
        controller : "prowebCtrl"
    });

    
    
    
    
     console.log("APP INIT");
     
    
    
    });
