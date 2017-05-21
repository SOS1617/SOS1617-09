/*global angular*/
/*global Highcharts*/
angular
    .module("sos09-app")
    .controller("WagesController", ["$scope", "$http", function($scope, $http) {

        console.log("Highcharts controller init OK");
         var provinces = [];
                var varied = [];
                var averageWage = [];
                 var names = [];
                    var smartphones = [];
                    var tablets = [];
                    var results=[];
        
        $http.get("https://sos1617-08.herokuapp.com/api/v1/wages/?apikey=hf5HF86KvZ").then(function(response) {
                var wagesResult = response.data;
               
                for (var i = 0; i < wagesResult.length; i++) {
                    provinces.push(wagesResult[i].province);
                    varied.push(wagesResult[i].varied);
                    averageWage.push(Number(wagesResult[i].averageWage));
                }

                $http.get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis").then(function(response) {
                    var TicsResults = response.data; 
                   
                    for (var i = 0; i < TicsResults.length; i++) {
                        names.push(TicsResults[i].country);
                        smartphones.push(TicsResults[i].smartphone);
                        tablets.push(TicsResults[i].tablet);
                    }
                for(var j = 0; j < TicsResults.length; j++){
                    for(var e = 0; e < wagesResult.length; e++){
                       if(names[j]=="spain"){
                                 results.push([j,e,averageWage[e]]);
                            }else{
                                results.push([j,e,0]);
                            }
                           
                        }
                    }
                    
                    //////////////////////////////////////////
                    
Highcharts.chart('container', {

    chart: {
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
    },


    title: {
        text: 'Wages and smartphone data'
    },

    xAxis: {
        categories: names
    },

    yAxis: {
        categories:provinces,
        title: null
    },

    colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[0]
    },

    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 50,
        symbolHeight: 280
    },

    tooltip: {
        formatter: function () {
            return '<b> Smartphones in: </b>' +'<b>' + this.series.xAxis.categories[this.point.x] + ' - '+
                smartphones[this.point.x] + '</b><br> and wages <b>' + this.series.xAxis.categories[this.point.x] +" - "+this.point.value +'</b>';
        }
    },

    series: [{
        name: 'Values',
        borderWidth: 1,
        data: results,
        dataLabels: {
            enabled: true,
            color: '#000000'
        }
    }]

});
                   
                    
                    
                    
                    /////////////////////////////////////
                  /*  Highcharts.chart('container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'G09 & G08'
                        },
                        xAxis: {
                            categories: names
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: ''
                            }
                        },
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                            shared: true
                        },
                        plotOptions: {
                            column: {
                                stacking: 'percent'
                            }
                        },
                        series: [{
                            name: 'Smartphone',
                            data: smartphones
                        }, {
                            name: 'Tablets',
                            data: tablets
                        }, {
                            name: 'AverageWage',
                            data: averageWage
                        }]
                    });*/
                });
            });

    }]);
