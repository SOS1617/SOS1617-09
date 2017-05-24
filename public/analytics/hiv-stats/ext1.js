/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("sos09-app")
    .controller("CtrlExt", ["$http", "$scope", function($http, $scope) {


        var dato1 = [];
        var dato2 = [];
        var total = [];


        $http
            .get("https://sos1617-09.herokuapp.com/api/v2/hiv-stats?apikey=manuel")
            .then(function(res) {
                dato1 = funciondatos();
                total.push(dato1);

                function funciondatos() {
                    var ret = [];

                    res.data.forEach(function(d) {
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

        $http
            .get("https://sos1617-01.herokuapp.com/api/v2/startups-stats?apikey=sos161701")
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
                        text: "Hiv incidences and Readers (Pisa Results)"
                    },
                    plotOptions: {
                        column: {
                            depth: 25
                        }
                    },
                    xAxis: {
                        categories: dato2.map(function(d) {
                            return d.total;
                        })
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    series: [{
                        name: 'Hiv total',
                        data: dato1.map(function(d) {
                            return Number(d.incidence);
                        })
                    }, {
                        name: 'Startups investment',
                        data: dato2.map(function(d) {
                            return Number(d.investment);
                        })
                    }]
                });

                function funciondatos2() {
                    var ret = [];

                    res.data.forEach(function(d) {
            
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.total = d.total;
                        res.data.increase = d.increase;
                        res.data.investment = d.investment;
                        ret.push({
                            
                            "country": res.data.country,
                            "year": res.data.year,
                            "total": res.data.total,
                            "increase": res.data.increase,
                            "investment": res.data.investment
                        });

                    });

                    return ret;
                }



            });




    }]);
