/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("sos09-app")
    .controller("ProxyCtrl", ["$http", "$scope", function($http, $scope) {

        //Variables de mi API
        $scope.country = [];
        $scope.year = [];
        $scope.incidence = [];
        $scope.total = [];
        $scope.percentage = [];
        $scope.data = {};
        var data = {};

        //Variables de la API a integrar

        $scope.data2 = {};
        var data2 = {};
        $scope.minimumSalary = [];
        $scope.averageSalary = [];






        $http.get("/proxy/hiv-stats").then(function(res) {

            data2 = res.data;
            $scope.data2 = data2;
            for (var i = 0; i < res.data.length; i++) {

                $scope.minimumSalary.push($scope.data2[i].minimumSalary);
                $scope.averageSalary.push(Number($scope.data2[i].averageSalary));

                console.log($scope.data2[i].averageSalary);

            }






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



                    Highcharts.chart('container01', {
                        chart: {
                            type: 'column',

                        },
                        title: {
                            text: 'Highcharts'
                        },
                        subtitle: {
                            text: 'Average salaries and hiv stats incidences Compare'
                        },
                        plotOptions: {
                            column: {
                                depth: 25
                            }
                        },
                        xAxis: {
                            categories: ''

                        },
                        yAxis: {
                            title: {
                                text: null
                            }
                        },
                        series: [{
                            name: 'Salaries',
                            data: $scope.averageSalary

                        }, {
                            name: 'Hiv stats',
                            data: $scope.incidence
                        }]
                    });



                });
        });



    }]);
