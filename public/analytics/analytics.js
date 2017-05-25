/*global angular*/
/*global google*/

angular
    .module("sos09-app")
    .controller("GrupalWidget", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
       
       var datosVero = [];
       var datosManu= [];
       var datosLuis=[];
       var total = [];
       
       
       $http
            .get("api/v2/internetandphones-stats?apikey=internetstats")
            .then(function(res) {
                datosVero = funciondatos();
                total.push(datosVero);
                
                function funciondatos() {
                    var ret = [];

                    res.data.forEach(function(d) {
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.usageinternet = d.usageinternet;
                        res.data.usagephoneline = d.usagephoneline;
                        ret.push({
                            "country": res.data.country,
                            "year": res.data.year,
                            "usageinternet": res.data.usageinternet,
                            "usagephoneline": res.data.usagephoneline
                        });

                    });

                    return ret;

                }
            });
            
            $http.get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis")
            .then(function(response) {
                datosLuis = funciondatos1();
                total.push(datosLuis);
                
                function funciondatos1() {
                    var ret = [];

                    ret.data.forEach(function(d) {
                        ret.data.country = d.country;
                        ret.data.year = d.year;
                        ret.data.smartphone = d.smartphone;
                        ret.data.tablet = d.tablet;
                        ret.push({
                            "country": ret.data.country,
                            "year": ret.data.year,
                            "smartphone": ret.data.smartphone,
                            "tablet": ret.data.tablet
                        });

                    });

                    return ret;

                }
            });
            $http
            .get("api/v2/hiv-stats?apikey=manuel")
            .then(function(res) {
                datosManu = funciondatos2();
                total.push(datosManu);
                
                google.charts.load('current', {
                    'packages': ['geochart'],
                    'mapsApiKey': "AIzaSyCXG8oC2k-nM18JMXiW0asnu6UJ8wLYCVA"

                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var finalData = [
                        ['Country', 'UsageInternet', 'UsagePhoneline']
                    ];

                    console.log(res.data);
                    res.data.forEach(function(item) {
                        finalData.push([item.country, Number(item.usageinternet), Number(item.usagephoneline)]);
                    });


                    var data = google.visualization.arrayToDataTable(finalData);
                    console.log(data);

                    var options = {
                        region: '150',

                        colorAxis: {
                            colors: ['#58ACFA', '#B40431']
                        }
                    };


                    var chart = new google.visualization.GeoChart(document.getElementById('GrupalWidget'));

                    chart.draw(data, options);
                }
            
                
                function funciondatos2() {
                    var ret = [];

                    res.data.forEach( function(d) {
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.incidence = d.incidence;
                        res.data.total = d.total;
                        res.data.percentage = d.percentage;

                        ret.push({
                            "country": res.data.country,
                            "year": res.data.year,
                            "incidence": res.data.incidence,
                            "total": res.data.total,
                            "percentage" : res.data.percentage
                        });

                    });

                    return ret;

                }
            });
                   
                  

}]);
                