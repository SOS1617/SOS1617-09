angular
    .module("sos09-app")
    .controller("EditControllerv", ["$scope", "$http", "$routeParams","$location",function($scope, $http,$routeParams,$location) {
        console.log("EditCotroller initialized");
        
        $scope.url = "/api/v2/internetandphones-stats";

        

        function refresh() {

            $http
                .get($scope.url+ "/"+ $routeParams.country + "?apikey=internetstats")
                .then(function successCallback(response) {
                    console.log("dev"+response.data);
                    $scope.updateTic = response.data;

                }, function errorCallback(response) {
                    console.log("Entra1");
                    $scope.updateStat = [];

                });
                
                
            
        }
         $scope.update = function(newStat) {

            $http
                .put($scope.url+"/"+newStat.country + "?apikey=internetstats",{
                    country: newStat.country,
                    year: newStat.year,
                    usageInternet: newStat.usageInternet,
                    usagephoneline: newStat.usagephoneline
                })
                .then(function(response) {
                    console.log("Stat Updated 2");
                    switch (response.status) {
                    case 400:
                        alert("Please fill all the fields");
                        break;
                    default:
                        alert("OK");
                        break;
                    }
                    $location.path("/");
               
                });
        };
        
        


        refresh();

 }]);
