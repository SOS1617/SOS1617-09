angular
    .module("TicsManagerApp")
    .controller("EditController", ["$scope", "$http", "$routeParams","$location", function($scope, $http, $routeParams,$location) {
        console.log("Edit Controller INIT OK");
        
 $scope.url = "/api/v2/ticsathome-stats/";

        function refresh() {

            $http
                .get($scope.url + $routeParams.country + "/?apikey=ticsathomeLuis")
                .then(function successCallback(response) {
                    $scope.updateTic = response.data;

                }, function errorCallback(response) {
                    console.log("Entra1");
                    $scope.updateTic = [];

                });
                
                
            
        }
         $scope.put = function(update) {

            $http
                .put($scope.url +update.country + "?apikey=ticsathomeLuis",{
                    country: update.country,
                    year: update.year,
                    smartphone: update.smartphone,
                    tablet: update.tablet
                })
                .then(function(response) {
                    console.log("Tic Updated");
                    $location.path("/");
                    // refresh();
                });
        };
        
        


        refresh();

 }]);
