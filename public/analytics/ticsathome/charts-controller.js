/*global angular*/
/*global Highcharts*/
angular
.module("sos09-app")
.controller("ChartController", ["$scope", "$http", function($scope, $http) {
    $scope.url = "/api/v2/ticsathome-stats";
    console.log("Highcharts controller init OK");
    $http
    .get($scope.url+"?apikey=ticsathomeLuis").then(function(response){
        var results = response.data;
        var names =[];
        var smartphones=[];
        var tablets =[];
        for(var i =0;i<results.length;i++){
            names.push(results[i].country);
             smartphones.push(results[i].smartphone);
              tablets.push(results[i].tablet);
        }
        
        Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Stats in Tics At Home'
    },
    subtitle: {
        text: 'Source: Stats on Internet'
    },
    xAxis: {
        categories: names,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Stats',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: 'Decimals'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Smartphone',
        data: smartphones
    }, {
        name: 'Tablet',
        data: tablets
    }]
});
        
        
        
    });
    
    
    
    
}]);