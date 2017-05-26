/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("sos09-app")
    .controller("ProxyCtroller", ["$http", "$scope", function($http, $scope) {


        var dato1 = [];
        var dato2 = [];
        var total = [];

        $http
            .get("api/v2/internetandphones-stats?apikey=internetstats")
            .then(function(res) {
                dato2 = funciondatos2();
                total.push(dato2);
                
                function funciondatos2() {
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


        $http
            .get("/proxy/internetstats")
            .then(function(res) {
                dato1 = funciondatos();
                total.push(dato1);

                Highcharts.chart('container01', {
                    chart: {
                        type: 'column',

                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Comparason male umployments and usage of internet'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato2.map(function(d) {
                            return d.country;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Male Uneployment (%)',
                        data: dato1.map(function(d) {
                            return Number(d.male_unemployment_ratio);
                        })
                    }, {
                        name: 'Usage Internet',
                        data: dato2.map(function(d) {
                            return Number(d.usageinternet);
                        })
                    }]
                });


                function funciondatos() {
                    var ret = [];

                    res.data.forEach(function(d) {
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.male_unemployment_ratio = d.male_unemployment_ratio;
                        res.data.female_unemployment_ratio = d.female_unemployment_ratio;
                        ret.push({
                            "country": res.data.country,
                            "year": res.data.year,
                            "male_unemployment_ratio": res.data.male_unemployment_ratio,
                            "female_unemployment_ratio": res.data.female_unemployment_ratio
                        });

                    });

                    return ret;

                }


                
            });




    }]);
