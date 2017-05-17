/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("sos09-app")
    .controller("Cotroller", ["$http", "$scope", function($http, $scope) {


        var dato1 = [];
        var dato2 = [];
        var total = [];


        $http
            .get("api/v2/internetandphones-stats?apikey=internetstats")
            .then(function(res) {
                dato1 = funciondatos();
                total.push(dato1);

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

        $http
            .get("https://sos1617-03.herokuapp.com/api/v1/results/?apikey=apisupersecreta")
            .then(function(res) {
                dato2 = funciondatos2();
                total.push(dato2);


                Highcharts.chart('container03', {
                    chart: {
                        type: 'areaspline',

                    },
                    title: {
                        text: 'Highcharts'
                    },
                    subtitle: {
                        text: 'Comparason between the total of startups and the math PISA results'
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato1.map(function(d) {
                            return d.country;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Usages PhoneLines',
                        data: dato1.map(function(d) {
                            return Number(d.usagephoneline);
                        })
                    }, {
                        name: 'Math Stats',
                        data: dato2.map(function(d) {
                            var res = d.math + d.reading + d.science;
                            return res;
                        })
                    }]
                });

                function funciondatos2() {
                    var ret = [];

                    res.data.forEach(function(d) {
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.science = d.science;
                        res.data.reading = d.reading;
                        res.data.math = d.math;
                        ret.push({
                            "country": res.data.country,
                            "year": res.data.year,
                            "science": res.data.science,
                            "reading": res.data.reading,
                            "math": res.data.math
                        });

                    });

                    return ret;
                }



            });




    }]);
