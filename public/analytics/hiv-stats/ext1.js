/*global angular*/
/*global Highcharts*/
/*global EJSC*/
angular
    .module("sos09-app")
    .controller("CtrlExt", ["$http", "$scope", function($http, $scope) {

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
        $scope.country2 = [];
        $scope.year2 = [];
        $scope.total2 = [];
        $scope.increase = [];
        $scope.investment = [];
        $scope.data2 = {};
        var data2 = {};



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


            

        $http
            .get("https://sos1617-01.herokuapp.com/api/v2/startups-stats?apikey=sos161701")
            .then(function(res) {
                data2 = res.data;
                $scope.data2 = data2;

                for (var i = 0; i < res.data.length; i++) {

                    $scope.country2.push($scope.data2[i].country);
                    $scope.year2.push(Number($scope.data2[i].year));
                    $scope.total2.push(Number($scope.data2[i].total));
                    $scope.increase.push(Number($scope.data2[i].increase));
                    $scope.investment.push(Number($scope.data2[i].investment));

                    console.log($scope.data2[i].country);

                }


                /**INTEGRACIÓN EN HIGHCHARTS**/
                Highcharts.chart('hiv&startups', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'HIV and Startups compare'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        title: {
                            text: 'Year'

                        },
                        categories: $scope.year
                    },
                    yAxis: {
                        title: {
                            text: 'Incidences and investment'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: 'HIV Incidendes',
                        data: $scope.incidence
                    }, {
                        name: 'Startups investment',
                        data: $scope.investment
                    }]
                });







        /***Integración en EJSChartS***/

        var chart = new EJSC.Chart("hivTotal&startupsTotal", {
            show_legend: false

        });
   

        var union =chart.addSeries( new EJSC.StackedBarSeries({
            intervalOffset: 1
        }));

        union.addSeries(new EJSC.BarSeries(
            new EJSC.ArrayDataHandler([

                [$scope.total[0], $scope.country[0]],
                [$scope.total[1], $scope.country[1]],
                [$scope.total[2], $scope.country[2]],
                [$scope.total[3], $scope.country[3]],
                [$scope.total[4], $scope.country[4]],
                [$scope.total[5], $scope.country[5]]


            ])
        ));


        union.addSeries(new EJSC.BarSeries(
            new EJSC.ArrayDataHandler([

                [$scope.total2[0], $scope.country2[0]],
                [$scope.total2[1], $scope.country2[1]],
                [$scope.total2[2], $scope.country2[2]],
                [$scope.total2[3], $scope.country2[3]],
                [$scope.total2[4], $scope.country2[4]],
                [$scope.total2[5], $scope.country2[5]]
            ])
        ));

        chart.addSeries(union);

            });
});
    }]);
