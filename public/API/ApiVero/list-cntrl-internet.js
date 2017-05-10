angular
    .module("InternetManagerApp")
    .controller("ListController",["$scope","$http","$location",function($scope, $http,$location){
        console.log("Cotroller initialized");
        $scope.url= "/api/v2/ticsathome-stats";
        $scope.apikey="?apikey=";
        $scope.limit= 3;
        $scope.offset=0;
        
        refresh();
        
        function refresh(){
            if($scope.datas==[]){
                console.log("[])");
            }
            if($scope.offset==0){
                $http
                .get($scope.url+$scope.apikey+"internetstats"+"&limit="+$scope.limit+"&offset="+$scope.offset+"&from=2010&to=2017")
                .then(function(response) {
                    $scope.datas=response.data;
                
                 });
            }
        }
        
        $scope.create=function(){
            $http
                .get($scope.url+"/loadInitialData"+$scope.apikey+$scope.key)
                .then(function(response){
                    refresh();
                });
        };
        
        $scope.getData = function(){
           
           check($scope.key);
            $http
                .get($scope.url+$scope.apikey+ $scope.key)
                .then(function(response){
                    $scope.ticsathome = response.data;
                   
                     if($scope.ticsathome.isEmpty){
                         document.getElementById("createInitialData").disabled = false;
                    }else{
                       document.getElementById("createInitialData").disabled = true;
                    }
                    
                    console.log( "Showing data "  );
                    

            });
            
                
      };
 

        $scope.add = function(newStat) {
           $http
                .post($scope.url+$scope.apikey+$scope.key,$scope.newStat)
                .then(function(response) {
                    console.log("Created");
                     alert("Añadido correctamente");
                    refresh();
                },function(response) {
                    switch (response.status) {
                        case 409:
                            alert("Error, you are trying to add a existing country");
                            break;
                        case 400:
                            alert("You have not fill all data");
                            break;
                        default:
                            alert("Error try again");
                            break;
                    }
                    });
        };
        $scope.delete =function(country){
            $http
                .delete($scope.url + country + $scope.apikey+$scope.key)
                .then(function(response){
                    console.log("Deleted"+ country);
                    alert("Eliminado correctamente");
                    refresh();
                });
                
        };
        $scope.deleteAll =function(){
            
             $http
                .delete($scope.url+$scope.apikey+$scope.key)
                .then(function successCallback(response) {
                    console.log("Deleted");
                    document.getElementById("createInitialData").disabled = false;
                     alert("Eliminados todos los datos");
                },function errorCallback(response){
                   console.log("Error al borrar datos");
                   
                refresh();
                
                });
                refresh();
                
        };
        $scope.put =function(newStat){
            $http
                .put($scope.url+ newStat.country +$scope.key, {
                    country: newStat.country,
                    year: newStat.year,
                    usageinternet: newStat.usageInternet,
                    usagephoneline: newStat.usagephoneline
                })
                .then(function(response){
                    console.log("refresh");
                    alert("Actualizado correctamente");
                    refresh();
                });
        };
        $scope.check = function(){
            if($scope.key1 === "internetstats"){
            $scope.key = $scope.key1;
            }
            if ($scope.key1 != "internetstats"){
                if ($scope.key1 == ""){
                    alert("Empty password");
                }else{
                 alert("Incorrect password"); 
                }
             $scope.key = $scope.key1;
            }
        };
        
        $scope.siguiente = function() {
            $scope.offset = $scope.offset + 1;

            $scope.paginacion();
        };
        $scope.anterior = function() {
            if($scope.offset>0){
            $scope.offset = $scope.offset - 1;
            }
            $scope.paginacion();
        };


        $scope.paginacion = function() {
            $scope.country = {};

            $http
                .get($scope.url + $scope.apikey+ $scope.key + "&from=10&to=10000&limit=" + $scope.limit + "&offset=" + $scope.offset)
                .then(function(response) {
                    console.log("offset" + $scope.offset);
                    console.log("limit" + $scope.limit);
                    $scope.country = response.data;
                    console.log("GET 200 ok");
                    refresh();
                

                });
        };

        $scope.busqueda = function() {

            $http
                .get($scope.url + $scope.apikey + $scope.key + "&from=" + $scope.from + "&to=" + $scope.to)
                .then(function(response) {

                    $scope.country = response.data;
                    console.log("SEARCH 200 ok");

                });
        };
        
        refresh();
        
    }]);
    