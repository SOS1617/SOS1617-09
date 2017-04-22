angular
    .module("InternetManagerApp")
    .controller("ListController",["$scope","$http",function($scope, $http){
        console.log("Cotroller initialized");
        function refresh(){
        
        $http
            .get("/api/v1/internetandphones-stats?apikey=internetstats")
            .then(function successCallback(response){
                $scope.internetandphones=response.data;
              
                },function errorCallback(response){
                    console.log("entra");
                    $scope.internetandphones=[];
                    
                    
                    
                
            });
    }
    $scope.refresh=function(){
        refresh();
        
    };
    $scope.create =function(){
        $http
            .get("/api/v1/internetandphones-stats/loadInitialData?apikey=internetstats")
            .then(function(response) {
                    console.log("Created Initial data");
                    refresh();
            });
        };
        $scope.add = function(newStat) {
            console.log(newStat)
        $http
            .post("/api/v1/internetandphones-stats?apikey=internetstats", {
                country: newStat.country,
                year: newStat.year,
                usageinternet: newStat.usageInternet,
                usagephoneline: newStat.usagephoneline,
            })
            .then(function(response){
                console.log("Created");
                refresh();
            });
        };
            
        $scope.delete =function(country){
            $http
                .delete("/api/v1/internetandphones-stats" + "/" + country + "?apikey=internetstats")
                .then(function(response){
                    console.log("Deleted"+ country);
                    refresh();
                });
                
        };
        $scope.deleteAll =function(){
            
            $http
                .delete("/api/v1/internetandphones-stats?apikey=internetstats")
                .then(function (response){
                    console.log("All is Deleted");
                });
                
        };
        $scope.put =function(newStat){
            $http
                .put("/api/v1/internetandphones-stats"+ "/" + newStat.country +"?apikey=internetstats", {
                    country: newStat.country,
                    year: newStat.year,
                    usageinternet: newStat.usageInternet,
                    usagephoneline: newStat.usagephoneline
                })
                .then(function(response){
                    console.log("refresh");
                    refresh();
                });
        };
        refresh();
        
    }]);