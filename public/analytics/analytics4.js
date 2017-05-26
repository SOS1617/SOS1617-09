/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("sos09-app")
    .controller("GrupalWidget", ["$http", "$scope", function($http, $scope) {

        
       var datosVero = [];
       var datosManu= [];
       var datosLuis=[];
       var total = [];

        $http
            .get("api/v2/internetandphones-stats?apikey=internetstats")
            .then(function(res) {
                datosVero = funciondatosv();
                total.push(datosVero);
                
                function funciondatosv() {
                    var ret = [];

                    res.data.forEach(function(d) {
                        res.data.usageinternet = d.usageinternet;
                        res.data.usagephoneline = d.usagephoneline;
                        ret.push({
                            "usageinternet": res.data.usageinternet,
                            "usagephoneline": res.data.usagephoneline
                        });

                    });

                    return ret;

                }
            });
              $http.get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis")
            .then(function(response) {
                datosLuis = funciondatosl();
                total.push(datosLuis);
                
                function funciondatosl() {
                    var ret = [];

                    ret.data.forEach(function(d) {
                        ret.data.country = d.country;
                        ret.data.tablet = d.tablet;
                        ret.push({
                            "country": ret.data.country,
                            "tablet": ret.data.tablet
                        });

                    });

                    return ret;

                }
            });


        $http
            .get("api/v2/hiv-stats?apikey=manuel")
            .then(function(res) {
                datosManu = funciondatosm();
                total.push(datosManu);

                Highcharts.chart('GrupalWidget', {
                    chart: {
                        type: 'column',

                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Comparason usage of tablet, usage of internet and HIV percentage'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: datosLuis.map(function(d) {
                            return d.country;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Usage Tablet',
                        data: datosLuis.map(function(d) {
                            return Number(d.tablet);
                        })
                    }, {
                        name: 'Usage Internet',
                        data: datosVero.map(function(d) {
                            return Number(d.usageinternet);
                        })
                    }, {
                        name: 'PercentageHIV',
                        data: datosManu.map(function(d) {
                            return Number(d.percentage);
                        })
                    }]
                });


                  function funciondatosm() {
                
                    var ret = [];

                    res.data.forEach( function(d) {
                  
                        res.data.percentage = d.percentage;

                        ret.push({
                       
                            "percentage" : res.data.percentage
                        });

                    });

                    return ret;
                 }


                
            });




    }]);