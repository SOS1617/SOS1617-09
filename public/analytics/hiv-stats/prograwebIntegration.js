/*global angular*/
/*global Highcharts*/
/*global EJSC*/

angular
    .module("sos09-app")
    .controller("prowebCtrl", ["$http", "$scope", function($http, $scope) {

        //Variables de mi API
        $scope.apikey = "manuel";
        $scope.country = [];
        $scope.year = [];
        $scope.incidence = [];
        $scope.total = [];
        $scope.percentage = [];
        $scope.data = {};
        var data = {};

        //Variables de la API a integrar
        /*   properties: {
address: "1 Earhart Dr",
category: "airport",
tel: "(610) 383-6057",
landmark: true,
maki: "airport"
center: [
-72.508049,
41.387161
],
},*/
        $scope.feature = [];
        $scope.category = [];
        $scope.center = [];

        $scope.data2 = {};
        var data2 = {};

        $http
            .get("https://api.mapbox.com/geocoding/v5/mapbox.places/Spain.json?country=us&access_token=pk.eyJ1IjoibWp0ciIsImEiOiJjajNhOTBicWgwMDNqMzhsdzBsZ3JpNzExIn0.jbbfuU8l2LplqSooVeLlHQ")
            .then(function(response) {
                console.log("Datos mashup cogidos correctamente");
                data2 = response.data;
                $scope.data2 = data2.features;


                for (var i = 0; i < 5; i++) {
                    $scope.category.push($scope.data2[i].properties.category);
                    console.log($scope.category);
                    $scope.center.push(Number($scope.data2[i].center[0]));
                    $scope.center.push(Number($scope.data2[i].center[1]));

                    console.log($scope.center);
                }

                //console.log(response.data);




                $http
                    .get("https://sos1617-09.herokuapp.com/api/v2/hiv-stats?apikey=manuel")
                    .then(function(response) {

                        data = response.data;
                        $scope.data = data;

                        for (var i = 0; i < response.data.length; i++) {

                            $scope.country.push($scope.data[i].country);
                            $scope.year.push(Number($scope.data[i].year));
                            $scope.incidence.push(Number($scope.data[i].incidence));
                            $scope.total.push(Number($scope.data[i].total));
                            $scope.percentage.push(Number($scope.data[i].percentage));

                            console.log($scope.data[i].country);

                        }




                        Highcharts.chart('hivTotal&progweb', {

                            title: {
                                text: 'HIV and Center Spain map coordinates compare'
                            },

                            subtitle: {
                                text: ''
                            },

                            yAxis: {
                                title: {
                                    text: 'Number of data'
                                }
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: false
                                    },
                                    enableMouseTracking: true
                                }
                            },

                            series: [{
                                name: 'Features Center',
                                data: $scope.center
                            }, {
                                name: 'HIV Incidences',
                                data: $scope.incidence
                            }]

                        });

                    });

            });

    }]);
