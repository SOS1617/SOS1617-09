angular
.module("HivApp")
.controller("ListCtrl",["$scope","$http",function($scope,$http){
            console.log("Controller Initialize (splite)");
           function refresh(){
           $scope.contact = {name: "PEPE", phone : "12345" , email : "pepe@pepe.com"}
           $http.get("/api/v1/contacts ")
           .then (function(response){
              $scope.contacts =  response.data;
               
           });
           }
           $scope.addContact = function(){
               
               $http 
               .post("url,que seria ap/v1/etc",$scope.newContact)
               .then(function(){
                   refresh();
               })
           }
           
        }]);