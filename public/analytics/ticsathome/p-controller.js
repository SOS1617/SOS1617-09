/*global angular*/

angular
  .module("sos09-app")
  .controller("PController", ["$scope", "$http", function($scope, $http) {
      
      
var req = {
 method: 'GET',
 url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?&cat=movies&count=10',
 headers: {
   'X-Mashape-Key': 'il3oS7alzjmshawAV4LRnpo7Xvowp1fhV4mjsnffIYbO8HjLMB'
 }
      };
      
      
     
      $http(req)
      .then(function(response){
         for(var i =0;i<response.data.length;i++){
          
             document.write("<br><li>"+"MOVIE: "+response.data[i].author+". Words: "+ response.data[i].quote+"</li></br>"); 
         
             
         }
         
        
        });
        
     

    
  }]);
  
  
  