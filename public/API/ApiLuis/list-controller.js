angular
    .module("TicsManagerApp")
    .controller("ListController", ["$scope", "$http", function($scope, $http) {
        console.log("List Controller INIT OK");

    $scope.url = "/api/v2/ticsathome-stats";

      
        

       $scope.refresh= refresh();

//DATOS INICIALES
        $scope.create = function() {
           
            $http
                .get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
                .then(function(response) {
                    console.log("Created Initial data");
                  
                    refresh();
                });
            
            
        };
//Recargar pagina inicial

  function refresh() {
      if($scope.apikey=="ticsathomeLuis"){
            $http
            .get("/api/v2/ticsathome-stats?apikey="+$scope.apikey)
                /*.get($scope.url+"?apikey="+$scope.apikey)*/
                .then(function successCallback(response) {
                  console.log($scope.apikey);
                    $scope.ticsathome = response.data;
                    if($scope.ticsathome.isEmpty){
                         document.getElementById("createInitialData").disabled = false;
                    }else{
                       document.getElementById("createInitialData").disabled = true;
                    }
                },function errorCallback(response){
                    console.log("Error al cargar los datos");
                    $scope.ticsathome= [];
                   
                });
      }else{
            $scope.ticsathome= [];
      }
        }
        
         $scope.checkApiKey = function(dato) {

           $http
            .get("/api/v2/ticsathome-stats?apikey="+dato)
                /*.get($scope.url+"?apikey="+$scope.apikey)*/
                .then(function successCallback(response) {
                    
                  
                   $scope.apikey = dato;
                 
                    console.log("Acierto apikey");
                   refresh();
                   
                },function errorCallback(response){
                   
                    console.log("Error, ApiKey erronea, pruebe otra vez");
                 
                   
                });
        };


        $scope.add = function(newTic) {

            $http
                .post($scope.url+"?apikey="+$scope.apikey,$scope.newTic)
                .then(function(response) {
                    console.log("Created");
                    refresh();
                });
        };
        $scope.delete = function(country) {

            $http
                .delete($scope.url+"/"+country+"?apikey="+$scope.apikey)
                .then(function(response) {
                    console.log("Deleted" + country);
                    refresh();
                });
        };
        $scope.deleteAll = function() {

            $http
                .delete($scope.url+"?apikey="+$scope.apikey)
                .then(function successCallback(response) {
                    console.log("Deleted");
                    document.getElementById("createInitialData").disabled = false;
                },function errorCallback(response){
                   console.log("Error al borrar datos");
                   
                refresh();
                
                });
                refresh();
                
        };



        $scope.put = function(newTic) {

            $http
                .put($scope.url + "/" + newTic.country + "?apikey="+$scope.apikey, {
                    country: newTic.country,
                    year: newTic.year,
                    smartphone: newTic.smartphone,
                    tablet: newTic.tablet
                })
                .then(function(response) {
                    console.log("Data refresh");
                     refresh();
                });
        };


  
$scope.busqueda = function(dato) {

           $http
            .get("/api/v2/ticsathome-stats/"+dato+"?apikey="+$scope.apikey)
                /*.get($scope.url+"?apikey="+$scope.apikey)*/
                .then(function successCallback(response) {
                    $scope.ticsathome = response.data;
                    console.log("Busqueda con exito");
                   
                },function errorCallback(response){
                    
                    console.log("Search Fail");
                   refresh();
                   
                });
        };
        //GET NO PAGINATION
        $scope.getData = function(){
            $http
                .get($scope.url+"?apikey="+ $scope.apikey)
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
      //GET A UN CONJUNTO CON PAGINACIÓN
        $scope.paginacion = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
            
        } ;

    refresh();

    }]);
