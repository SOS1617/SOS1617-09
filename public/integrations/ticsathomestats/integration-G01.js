/*global angular*/
/*global Chart*/

angular
    .module("sos09-app")
    .controller("G01Controller", ["$scope", "$http", function($scope, $http) {
        var G01Result = [];
        var results = [];
        var countries = [];

        $http.get("https://sos1617-01.herokuapp.com/api/v2/gvg?apikey=sos161701").then(function(response) {
            G01Result = response.data;

        });


        $http.get("/api/v3/ticsathome-stats").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < G01Result.length; j++) {
                    if (response.data[i].country == G01Result[j].country.toLowerCase()) {
                        countries.push(response.data[i].country, response.data[i].country);
                        results.push(response.data[i].tablet, G01Result[j].income_ratio);
                    }

                }
            }


            console.log(results);
            console.log(countries);
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: countries,
                    datasets: [{
                        label: '% Datas, Tablets & income_ratio',
                        data: results,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        });


    }]);
