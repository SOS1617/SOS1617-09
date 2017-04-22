angular
    .module("TicsManagerApp")
    .controller("ListController", ["$scope", "$http", function($scope, $http) {
        console.log("Controller INIT OK");


        function refresh() {

            $http
                .get("/api/v1/ticsathome-stats?apikey=ticsathomeLuis")
                .then(function successCallback(response) {
                  console.log("Entra2");
                    $scope.ticsathome = response.data;
                    
                },function errorCallback(response){
                    console.log("Entra1");
                    $scope.ticsathome= [];
                   
                });
        }
        

       $scope.refresh= refresh();


        $scope.create = function() {

            $http
                .get("/api/v1/ticsathome-stats/loadInitialData?apikey=ticsathomeLuis")
                .then(function(response) {
                    console.log("Created Initial data");
                    refresh();
                });
        };


        $scope.add = function(newTic) {

            $http
                .post("/api/v1/ticsathome-stats?apikey=ticsathomeLuis",$scope.newTic)
                .then(function(response) {
                    console.log("Created");
                    refresh();
                });
        };
        $scope.delete = function(country) {

            $http
                .delete("/api/v1/ticsathome-stats" + "/" + country + "?apikey=ticsathomeLuis")
                .then(function(response) {
                    console.log("Deleted" + country);
                    refresh();
                });
        };
        $scope.deleteAll = function() {

            $http
                .delete("/api/v1/ticsathome-stats?apikey=ticsathomeLuis")
                .then(function successCallback(response) {
                    console.log("Deleted");
                },function errorCallback(response){
                   console.log("Entra4");
                refresh();
                
                });
                console.log("Entra3");
                refresh();
                
        };



        $scope.put = function(newTic) {

            $http
                .put("/api/v1/ticsathome-stats" + "/" + newTic.country + "?apikey=ticsathomeLuis", {
                    country: newTic.country,
                    year: newTic.year,
                    smartphone: newTic.smartphone,
                    tablet: newTic.tablet
                })
                .then(function(response) {
                    console.log("refresh");
                     refresh();
                });
        };

        refresh();


    }]);
