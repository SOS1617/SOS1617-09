/*global angular*/
/*global Highcharts*/
/*global $*/
angular
    .module("sos09-app")
    .controller("ProxyCtrl", ["$http", "$scope", function($http, $scope) {

        var dato1 = [];
        var dato2 = [];
        var total = [];
 
        $http
            .get("api/v2/hiv-stats?apikey=manuel")
            .then(function(res) {
                dato2 = funciondatos2();
                total.push(dato2);
                
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


        $http.get("/proxy/hiv-stats").then(function(res) {
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
                        text: 'Comparason salaries and hiv stats'
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
                        name: 'Salaries',
                        data: dato1.map(function(d) {
                            return Number(d.minimumSalary);
                        })
                    }, {
                        name: 'Hiv stats',
                        data: dato2.map(function(d) {
                            return Number(d.hivstats);
                        })
                    }]
                });


                function funciondatos() {
                    var ret = [];

                    res.data.forEach(function(d) {
                        res.data.country = d.country;
                        res.data.year = d.year;
                        res.data.averageSalary_ratio = d.averageSalary;
                        res.data.minimumSalary_ratio = d.minimumSalary;
                        
                        ret.push({
                           
                            "country": res.data.country,
                            "year": res.data.year,
                            "minimun_salary_ratio": res.data.minimumSalary,
                            "average_salary_ratio": res.data.averageSalary
                        });

                    });

                    return ret;

                }


                
            });




    }]);


