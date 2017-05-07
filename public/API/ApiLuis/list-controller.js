angular
    .module("TicsManagerApp")
    .controller("ListController", ["$scope", "$http", function($scope, $http) {
        console.log("List Controller INIT OK");

    $scope.url = "/api/v2/ticsathome-stats";

      
        

       $scope.refresh= refresh();

//Crea datos iniciales
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
        
        // Comprueba apikey
          function  checkApiKey(dato) {
              if($scope.apikey ==null){
                   alert("No ha introducido apikey, intente de nuevo");
              }else{

           $http
            .get("/api/v2/ticsathome-stats?apikey="+dato)
                /*.get($scope.url+"?apikey="+$scope.apikey)*/
                .then(function successCallback(response) {
                    
                  
                  
                    alert("Apikey correcta");
                    

                   
                },function errorCallback(response){
                    alert("Apikey erronea, intentelo otra vez");
                  
                 
                   
                });
              }
        }

//Metodos scope
        $scope.add = function(newTic) {

            $http
                .post($scope.url+"?apikey="+$scope.apikey,$scope.newTic)
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
        $scope.delete = function(country) {

            $http
                .delete($scope.url+"/"+country+"?apikey="+$scope.apikey)
                .then(function(response) {
                    console.log("Deleted" + country);
                     alert("Eliminado correctamente");
                    refresh();
                });
        };
        $scope.deleteAll = function() {

            $http
                .delete($scope.url+"?apikey="+$scope.apikey)
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
                     alert("Editado correctamente");
                     refresh();
                }, function(response) {
                switch (response.status) {
                    case 400:
                        alert("Please fill all the fields");
                        break;
                    default:
                        alert("Error try again");
                        break;
}

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
           
           checkApiKey($scope.apikey);
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
      //GET A UN CONJUNTO CON PAGINACIÓN SIMPLE
        $scope.paginacion = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
            
        } ;
         //Paginación
        $scope.viewby = 0;
        $scope.totalItems = function() {
            return $scope.ticsathome.length;
        };
        $scope.currentPage = 1;
        $scope.itemsPerPage = function() {
            return $scope.limit;
        };
        $scope.maxSize = 5; //Number of pages buttons to show

       $scope.offset = 0;
       
        $scope.nextPage = function(pageNo) {
            var viewby = $scope.viewby;
            $scope.currentPage = pageNo;
            $scope.offset = parseInt( $scope.offset) +parseInt( $scope.viewby);
            console.log($scope.offset);
            $scope.limit = $scope.viewby;
             $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
            
        };
         $scope.previousPage = function(pageNo) {
            var viewby = $scope.viewby;
            $scope.currentPage = pageNo;
            $scope.offset -= viewby;
            
             $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
            
        };

        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
            $scope.offset = 0;
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+num +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
        };


    refresh();

    }]);
