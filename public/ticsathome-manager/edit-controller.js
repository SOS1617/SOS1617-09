/*global angular*/
angular
    .module("sos09-app")
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
                    smartphone:Number( update.smartphone),
                    tablet: Number(update.tablet)
                })
                .then(function(response) {
                    console.log("Tic Updated 2");
                    switch (response.status) {
                    case 400:
                        alert("Please fill all the fields");
                        break;
                    default:
                        alert("OK");
                        break;
}
                    $location.path("/");
                    // refresh();
                });
        };
        
        


        refresh();

 }]);
