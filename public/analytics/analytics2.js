/*global angular*/
/*global EJSC*/
angular
    .module("sos09-app")
    .controller("GrupalCtrl", ["$http", "$scope", function($http, $scope) {

        $scope.apikey1 = "manuel";
        $scope.apikey2 = "ticsathomeLuis";
        $scope.apikey3 = "";

    //Datos Manuel
    
       // $scope.country = [];
        //$scope.year = [];
        $scope.incidence = [];
        $scope.total = [];
       $scope.percentage = [];
        $scope.hivData = {};
        var hivData = {};
      
      //Datos Luis   
         
        //$scope.provincesEconomic = [];
        //$scope.year = [];
        $scope.smartphone = [];
        $scope.tablet = [];
        $scope.ticData = {};
        var ticData = {};


        $http
            .get("/api/v2/hiv-stats?apikey=" + $scope.apikey1)
            .then(function(res) {

                hivData = res.data;
                $scope.hivData = hivData;

                for (var i = 0; i < hivData.length; i++) {
                    $scope.incidence.push([$scope.hivData[i].country.slice(0, 3), Number($scope.hivData[i].incidence)]);
                    //$scope.total.push([$scope.hivData[i].province.slice(0, 3), Number($scope.hivData[i].total)]);
                    //$scope.percentage.push([$scope.hivData[i].province.slice(0, 3), Number($scope.hivData[i].percentage)]);

                }
                console.log("HIV DATA: ", $scope.incidence);

                $http
                    .get("/api/v2/ticsathome-stats?" + "apikey=" + $scope.apikey2)
                    .then(function(res) {
                        ticData = res.data;
                        $scope.ticData = ticData;

                        for (var i = 0; i < res.data.length; i++) {
                            $scope.smartphone.push([$scope.ticData[i].country.slice(0, 3), Number($scope.ticData[i].smartphone) / 100]);
                            //$scope.tablet.push([$scope.ticData[i].province.slice(0, 3), Number($scope.ticData[i].tablet) / 100]);


                        }
                        console.log("API Luis Data ", $scope.smartphone);

                        var chart = new EJSC.Chart("grupal", {
                            title: 'SOS1617-09 Grupal integration' ,
                            axis_bottom: {
                                caption: 'Country',
                            },
                            axis_left: {
                                caption: 'Number compare',
                            }
                        });

                        var scatterSeries1 = new EJSC.ScatterSeries(
                            new EJSC.ArrayDataHandler($scope.incidence), {
                                title: "Incidence",
                                useColorArray: true,
                                color: "rgb(30,144,255)",
                                pointStyle: "box"
                            }
                        );
/*
                        var scatterSeries2 = new EJSC.ScatterSeries(
                            new EJSC.ArrayDataHandler($scope.total), {
                                title: "HIV TOTAL",
                                useColorArray: true,
                                color: "rgb(255,0,0)",
                                pointStyle: "triangle"
                            }
                        );

                        var scatterSeries3 = new EJSC.ScatterSeries(
                            new EJSC.ArrayDataHandler($scope.percentage), {
                                title: "PERCENTAGE",
                                useColorArray: true,
                                color: "rgb(153,0,153)",
                                pointStyle: "circle"
                            }
                        );*/

                        var scatterSeries4 = new EJSC.ScatterSeries(
                            new EJSC.ArrayDataHandler($scope.smartphone), {
                                title: "SMARTPHONE",
                                useColorArray: true,
                                color: "rgb(96,96,96)",
                                pointStyle: "diamond"
                            }
                        );

                      /*  var scatterSeries5 = new EJSC.ScatterSeries(
                            new EJSC.ArrayDataHandler($scope.tablet), {
                                title: "TABLET",
                                useColorArray: true,
                                color: "rgb(255,255,0)",
                                pointStyle: "diamond"
                            }
                        );*/

                        chart.addSeries(scatterSeries1);
                      //  chart.addSeries(scatterSeries2);
                        //chart.addSeries(scatterSeries3);
                        chart.addSeries(scatterSeries4);
                      //  chart.addSeries(scatterSeries5);

                        chart.addSeries(new EJSC.TrendSeries(scatterSeries1, "linear", { //INCIDENCE
                            color: "rgb(30,144,255)"
                        }));

                  /*      chart.addSeries(new EJSC.TrendSeries(scatterSeries2, "linear", { //TOTAL
                            color: "rgb(255,0,0)"
                        }));

                        chart.addSeries(new EJSC.TrendSeries(scatterSeries3, "linear", { //PERCENTAGE
                            color: "rgb(153,0,153)"
                        }));*/

                        chart.addSeries(new EJSC.TrendSeries(scatterSeries4, "linear", { //SMARTPHONES
                            color: "rgb(255,128,0)"
                        }));

                        /*chart.addSeries(new EJSC.TrendSeries(scatterSeries5, "linear", { //TABLETS
                            color: "rgb(96,96,96)"
                        }));*/

                        
                    });
            });
}]);