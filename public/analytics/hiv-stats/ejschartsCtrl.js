/*global angular*/
/*global Highcharts*/
/*global EJSC*/

    angular
  .module("sos09-app")
  .controller("EJSChartsController", ["$scope", "$http", function($scope, $http) {

        // http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/column-stacked-percent/

        $scope.apikey = "manuel";
        $scope.country = [];
        $scope.year = [];
        $scope.incidence = [];
        $scope.total = [];
        $scope.percentage = [];
        $scope.data = {};
        var data = {};
       $scope.url = "/api/v2/hiv-stats";

       


        $http
      .get($scope.url + "?apikey=manuel").then(function(response) {

                data = response.data;
                $scope.data = data;
                //data.sort(sort_by('province', true, parseInt));

                for (var i = 0; i < data.length; i++) {
                    $scope.country.push($scope.data[i].country);
                    $scope.year.push(Number($scope.data[i].year));
                    $scope.incidence.push(Number($scope.data[i].incidence));
                    $scope.total.push(Number($scope.data[i].total));
                    $scope.percentage.push(Number($scope.data[i].percentage));

                    console.log($scope.data[i].country);
                }

                console.log("Controller intialized");



                //Highcharts
                Highcharts.chart('container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Stacked column chart'
                    },
                    xAxis: { //Estas serían los países (SÓLO ES OBLIGATORIO QUE SE MUESTREN TODAS EN UN ÚNICO WIDGET)
                        categories: $scope.country
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: "HIV STATS"
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: false
                    },
                    plotOptions: {
                        column: {
                            stacking: 'percent',

                        }
                    },



                    //Estas serían para cada uno de los países los valores que toma cada name, que son los tres datos extras
                    series: [{
                        name: 'incidence',
                        data: $scope.incidence
                    }, {
                        name: 'hiv-total',
                        data: $scope.total
                    }, {
                        name: 'percentage',
                        data: $scope.percentage
                    } ]
                });


                //Geocharts
                google.charts.load('current', {
                    'mapsApiKey': 'AIzaSyDft-LAnK-6P_m7RTRsbV7-oCLjEYe9ITU',
                    'packages': ['geochart']
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {

                    var myData = [ //no tienen que estar todos los campos
                        ['Country', 'Incidence', 'Year']
                    ];
                    response.data.forEach(function(d) {
                        myData.push([d.country, Number(d.incidence), Number(d.year)]);
                    });

                    var data = google
                        .visualization
                        .arrayToDataTable(myData);

                    var options = {
                        region: 'EU',
                        //CONSULTAR: https://developers.google.com/chart/interactive/docs/gallery/geochart
                        displayMode: 'markers',
                        colorAxis: {
                            colors: ['blue', 'purple']
                        }
                    };

                    var chart = new google.visualization.GeoChart(
                        document.getElementById('map'));

                    chart.draw(data, options);
                }

                //EJSchart (puede ser un donut/pastel con colores, uno por cada partido político. Suponiendo que x sea la suma de escaños totales, cada porción 
                //representará la parte de x que ha ganado cada uno de los cuatro partidos, y así se tendrían todos los recursos con todos los datos en uso.)
                //debería poner aquí algo de EJSchart o ya con que esté en la carpeta aquella vale?

                var chart = new EJSC.Chart("individualChart", {
                    show_legend: false,
                    title: 'DoughnutSeries'
                });

                //var sum = [1, 2, 3].reduce(add, 0);
                function add(a, b) {
                    return a + b;
                }
                var series1 = chart.addSeries(new EJSC.DoughnutSeries(
                    new EJSC.ArrayDataHandler([
                        [$scope.incidence.reduce(add, 0), "incidence"], //incidence
                        [$scope.total.reduce(add, 0), "total"], //total
                        [$scope.percentage.reduce(add, 0), "percentage"], //percentage
                    ]), {
                        opacity: 30, //default: 50
                        doughnutOffset: .2, //default: .5
                        position: "topRight", //default: "center"
                        height: "50%", //default: "100%"
                        width: "50%" //default: "100%"
                    }
                ));
                var series2 = chart.addSeries(new EJSC.DoughnutSeries(
                    new EJSC.ArrayDataHandler([
                        [$scope.incidence.reduce(add, 0), "incidence"], //incidence
                        [$scope.total.reduce(add, 0), "total"], //total
                        [$scope.percentage.reduce(add, 0), "percentage"], //percentage
                    ]), {
                        opacity: 80, //default: 50
                        doughnutOffset: .7, //default: .5
                        position: "bottomLeft", //default: "center"
                        height: "70%", //default: "100%"
                        width: "70%", //default: "100%"
                        onAfterDataAvailable: function(chart, series) {
                            chart.selectPoint(series.__points[0], true);
                        }

                    }
                ));
                //Si intento cambiarle el color como a la versión PIE no se muestra el grafo

            });
}]);