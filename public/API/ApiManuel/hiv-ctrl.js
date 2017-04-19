angular.module("HivStatsApp").
controller("hivCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("Controller initialized");
    
$scope.loadInitialData = function() {
       
            $http
                .get("/api/v1/hiv-stats/loadInitialData" + "?" + "apikey=" + "manuel")
                .then(function(response) {
                    console.log("Initial data succesful");
                });
    };


$scope.getAll = function(){
        $http
            .get("/api/v1/hiv-stats" + "?" + "apikey=" + "manuel")
            .then(function(response) {
               console.log("Get all correct");
                
                $scope.conjunto =response.data;
           
            });        
};

    $scope.addData = function() {
        $http
            .post("/api/v1/hiv-stats" + "?" + "apikey=" + "manuel")
            .then(function(response) {
                console.log("Data added!");
            }, function(response) {
            });
    };


    $scope.putData = function(data) {

        var oldCountry = data.oldCountry;
        var oldYear = data.oldYear;
        delete data._id;
        delete data.oldCountry;
        delete data.oldYear;

        $http
            .put("/api/v1/hiv-stats/" + oldCountry + "/" + oldYear + "?" + "apikey=" + "manuel", data)
            .then(function(response) {
                console.log("update " + data.country + " succesful");
            });
    };

    $scope.deleteData = function(data) {
        $http
            .delete("/api/v1/hiv-stats/" + data.country + "/" + data.year + "?" + "apikey=" + "manuel")
            .then(function(response) {
                console.log("deleted " + data.country + " correctly");
            });
    };

    $scope.deleteAllData = function() {
        $http
            .delete("/api/v1/hiv-stats" + "?" + "apikey=" + "manuel")
            .then(function(response) {
                console.log("delete ALL data ");
            });
    };

 

 
    }]);
 