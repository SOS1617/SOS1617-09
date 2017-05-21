angular
.module("sos09-app")
.controller("editCtrl",["$scope","$http","$routeParams","$location",function($scope,$http,$routeParams,$location){
    console.log("Edit controller initialized");
    var url = "http://sos1617-10.herokuapp.com/api/v2";
    var apikey = "apikey=manuel";
    
    function refresh(){
        $http
            .get(url + "/hiv-stats/" + $routeParams.country + "/" + Number($routeParams.year) + "?" + apikey)
            .then(function(response){
                $scope.updatedData = response.data[0];
                console.log(response.data[0])
                delete $scope.updatedData["_id"];
                console.log(response.data)
            }, function(err){
                console.log(err.data);
            });
    }
    
    $scope.updateData = function(){
        $http
            .put(url +"/hiv-stats/"+ $routeParams.country + "/" + Number($routeParams.year) + "?" + apikey, $scope.updatedMotorcycling)
            .then(function(response){
                console.log("Hiv  Updated");
                bootbox.alert("Hiv Updated");
                $location.path("/hivs/");
            }, function(response) {
                    switch (response.status) {
                        case 400:
                            bootbox.alert("Bad Request. Please enter all fields correctly.");
                            break;
                        default:
                            bootbox.alert("Please make sure that you have entered all the fields");
                            break;
                    }
            });
    };
    
    refresh();
    
}]);