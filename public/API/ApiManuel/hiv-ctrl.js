angular.module("HivStatsApp").
controller("hivCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Controller initialized");

    $scope.loadInitialData = function() {

        $http
            .get("/api/v2/hiv-stats/loadInitialData" + "?" + "apikey=" + "manuel")
            .then(function(response) {
                console.log("Initial data succesful");
                refresh();
            });
    };


    function refresh() {

       /* $scope.getAll = function() {*/
            $http
                .get("/api/v2/hiv-stats" + "?" + "apikey=" + "manuel")
                .then(function(response) {
                    console.log("Get all correct");
                    $scope.conjunto = response.data;

                });


       /* };*/

    }
    
    $scope.refresh = function(){
        
        refresh();
    }

                        /**** POST ***/
                        
    $scope.addData = function(newStats) {
        $http
            .post("/api/v2/hiv-stats" + "?" + "apikey=" + "manuel",  {
                country: newStats.country,
                    year: newStats.year,
                    incidence: newStats.incidence,
                    total: newStats.total,
                    percentage : newStats.percentage
            } )
            .then(function(response) {
                console.log("Data created!");
                refresh();
            });
    };
            /****PUT***/

$scope.putData = function (data) {
      
            $http.put("/api/v2/hiv-stats/" + data.country + "/" + data.year+"?apikey=manuel" ,{
               country: data.country,
                year : data.year,
                incidence : data.incidence,
                total: data.total,
                percentage : data.percentage 
            })
            .then(function(response){
                console.log("put do it succesful");
                refresh();
            }); 
               
            
        };

    $scope.deleteData = function(data) {
        $http
            .delete("/api/v2/hiv-stats/" + data.country + "?" + "apikey=manuel")
            .then(function(response) {
                console.log("deleted " + data.country + " correctly");
                refresh();
            });
    };

    $scope.deleteAllData = function() {
        $http
            .delete("/api/v2/hiv-stats" + "?" + "apikey=" + "manuel")
            .then(function(response) {
                console.log("delete ALL data ");
                refresh();
            });
    };


    refresh();

}]);
