angular.module("sos09-app").controller("listCtrl", ["$scope", "$http", function($scope, $http) {
       console.log("listCrl OK");

    $scope.url = "/api/v2/hiv-stats";
    $scope.apikey = "manuel";

      
       // refresh();
       $scope.refresh= refresh();

//Crea datos iniciales
        $scope.loadInitialData = function() {
           
            $http
                .get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
                .then(function(response) {
                    console.log("Created Initial data");
                  
                    refresh();
                });
            
            
        };
//Recargar pagina inicial

  function refresh() {
      if($scope.apikey=="manuel"){
            $http
            .get("/api/v2/hiv-stats?apikey="+$scope.apikey)

                .then(function successCallback(response) {
                  console.log($scope.apikey);
                    $scope.listData = response.data;
                    
                   
                },function errorCallback(response){
                    console.log("Error al cargar los datos");
                    $scope.listData= [];
                   
                });
      }else{
            $scope.listData= [];
      }
        }
        
        // Comprueba apikey
         
          function  checkApiKey(dato) {
              if($scope.apikey ==null){
                   alert("No ha introducido apikey, intente de nuevo");
              }else{

           $http
            .get("/api/v2/hiv-stats?apikey="+dato)
                .then(function successCallback(response) {
                
                    alert("Apikey correcta");
                   
                },function errorCallback(response){
                    alert("Apikey erronea, intentelo otra vez");
                 
                });
              }
        }

//Metodos scope
        $scope.addData = function(newData) {

            $http
                .post($scope.url+"?apikey="+$scope.apikey,$scope.newData)
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

$scope.busqueda = function(dato) {

           $http
            .get("/api/v2/hiv-stats/"+dato+"?apikey="+$scope.apikey)
                /*.get($scope.url+"?apikey="+$scope.apikey)*/
                .then(function successCallback(response) {
                    $scope.listData = response.data;
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
                .then(function successCallback(response){
                    $scope.listData = response.data;
                   
                     if($scope.listData.isEmpty){
                         document.getElementById("createInitialData").disabled = false;
                    }else{
                       document.getElementById("createInitialData").disabled = true;
                    }
                    
                    console.log( "Showing data "  );
                    

            },function errorCallback(response){
                    
                    $scope.listData = [];
                   
                });
            
                
      };
      //GET A UN CONJUNTO CON PAGINACIÓN SIMPLE
        $scope.paginacion = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.listData = response.data;
                });
            
        } ;
         //Paginación
        $scope.viewby = 0;
        $scope.totalItems = function() {
            return $scope.listData.length;
        };
        $scope.currentPage = 1;
        $scope.itemsPerPage = function() {
            return $scope.limit;
        };
        $scope.maxSize = 5; //Number of pages buttons to show

       $scope.offset = 0;
       
       
       
       
       $scope.newPage = function(pageNo) {
            var viewby = $scope.viewby;
            $scope.currentPage = pageNo;
            $scope.offset = pageNo*viewby-parseInt( $scope.viewby);
             $scope.limit = $scope.viewby;
             $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
            
        };
       
        $scope.nextPage = function(pageNo) {
            $scope.currentPage = pageNo;
            $scope.offset = parseInt( $scope.offset) +parseInt( $scope.viewby);
            console.log($scope.offset);
            $scope.limit = $scope.viewby;
             $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.listData = response.data;
                });
            
        };
        
         $scope.previousPage = function(pageNo) {
            var viewby = $scope.viewby;
            $scope.currentPage = pageNo;
            $scope.offset -= viewby;
            
             $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.listData = response.data;
                });
            
        };
 
        $scope.setItemsPerPage = function(num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1;
            $scope.offset = 0;
            var pages =[];
             $http
                .get($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    for(var i =1;i<=response.data.length / $scope.viewby;i++){
                        pages.push(i);
                        
                    }
                    if(pages.length*$scope.viewby<response.data.length){
                        pages.push(pages.length+1);
                    }
                    $scope.pages = pages;
                        document.getElementById("pagination").style.display = "block";
                         document.getElementById("pagination").disabled = false;
                });
            
           
                    
            
            
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+num +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.ticsathome = response.data;
                });
                
        };


    refresh();

    }]);
