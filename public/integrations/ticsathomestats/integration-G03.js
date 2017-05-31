/*global angular*/
/*global c3*/


angular
    .module("sos09-app")
    .controller("G03Controller", ["$scope", "$http", function($scope, $http) {
        var G03Result = [];
        var education = ['invEducation'];
        var smartphones = ['smartphone'];
        var countries = ['data3'];

        $http.get("https://sos1617-03.herokuapp.com/api/v3/investmentseducation/").then(function(response) {
            G03Result = response.data;
           

        });


        $http.get("/api/v3/ticsathome-stats").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < G03Result.length; j++) {
                    if (response.data[i].country == G03Result[j].country) {
                       
                        countries.push(response.data[i].country);
                        education.push(parseInt(G03Result[j].population));
                        smartphones.push(response.data[i].smartphone);
                    }

                }
            }

/*console.log(countries);
console.log(education);
console.log(smartphones);*/
       
var chart = c3.generate({
    data: {
        columns: [
           education,
            smartphones
           
        ],
        types: {
            data1: 'area-spline',
            data2: 'area-spline'
          
            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['invEducation', 'smartphone']]
    }
});


        });


    }]);
