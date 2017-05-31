/*global angular*/

angular
  .module("sos09-app")
  .controller("PController", ["$scope", "$http", function($scope, $http) {
      
      
var req = {
 method: 'GET',
 url: 'https://digital-canary-pricejson-v1.p.mashape.com/',
 headers: {
   'X-Mashape-Key': 'il3oS7alzjmshawAV4LRnpo7Xvowp1fhV4mjsnffIYbO8HjLMB'
 }
      };
      
      
     
      $http(req)
      .then(function(response){
         console.log(response.data);
         
        
        });
        
     

    
  }]);
  
  
  