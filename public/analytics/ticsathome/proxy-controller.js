/*global angular*/
/*global Highcharts*/
angular
    .module("sos09-app")
    .controller("proxyTicsController", ["$scope", "$http", function($scope, $http) {

        console.log("Highcharts controller init OK");
                var birthyears = [];
                var beerCountries=[];
                var resultCountries = [];
                var resultBirth = [];
                var resultSmart=[];
                var nameBeer=[];

                 var names = [];
                    var smartphones = [];
                    var tablets = [];
        
        $http.get("/proxy/ticsathome").then(function(response) {
                var beerResult = response.data;
               
                for (var i = 0; i < beerResult.length; i++) {
                    birthyears.push(beerResult[i].birthyear);
                    beerCountries.push(beerResult[i].country);
                    nameBeer.push(beerResult[i].name);
                    
                    
                    
                }
                
                

                $http.get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis").then(function(response) {
                    var TicsResults = response.data;
                    
                    
                   
                    for (var i = 0; i < TicsResults.length; i++) {
                        names.push(TicsResults[i].country);
                        smartphones.push(TicsResults[i].smartphone);
                        tablets.push(TicsResults[i].tablet);
                    }
                    
                    var aux=[];
                    for(var e = 0; e < TicsResults.length; e++){
                        for(var j = 0; j < beerResult.length; j++){
                            if(names[e]==beerCountries[j].toLocaleLowerCase()){
                             
                              resultCountries.push(names[e]+"/"+nameBeer[j]);
                              resultBirth.push(birthyears[j]);
                              resultSmart.push(smartphones[e]);
                              
                              //ResultCountries+="'"+names[e]+"' : "+"{"+"'Tics' : "+"'"+Number(smartphones[e])+"', "+ "'Years' : "+"'"+(smartphones[e])+"', "+"'Name' : "+"'"+Number(tablets[e])+"'";
                              aux.push(names[e]);
                             
                             
                            
                            
                        }
                            
                        }
                    }
                 //   var  ResultCountries2= ResultCountries.substring(0,ResultCountries.length-2) +"}}}";
                    console.log(resultCountries);
                    
                  
                    //////////
                   Highcharts.chart('container', {
    chart: {
        zoomType: 'xy'
    },
    title: {
        text: 'Average Tics in home, and beer in that country'
    },
    subtitle: {
        text: ''
    },
    xAxis: [{
        categories: resultCountries
    }],
    yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Years',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, { // Secondary yAxis
        title: {
            text: 'Values',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels: {
            format: '{value}',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        opposite: true
    }],
    tooltip: {
        shared: true
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        x: 50,
        verticalAlign: 'top',
        y: 30,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    series: [{
        name: 'Smartphones',
        type: 'column',
        yAxis: 1,
        data: resultSmart,
        tooltip: {
            valueSuffix: ''
        }

    }, {
        name: 'Years',
        type: 'spline',
        data: resultBirth,
        tooltip: {
            valueSuffix: ''
        }
    }]
});

 
                });
            });
            

    }]);