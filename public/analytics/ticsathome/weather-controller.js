/*global angular*/
angular
    .module("sos09-app")
    .controller("WeatherController", ["$scope", "$http", "$routeParams", function($scope, $http, $routeParams) {
        console.log("Geo Controller INIT OK");
        
          $http                                       
        .get("/api/v2/ticsathome-stats/2016" +"?apikey=ticsathomeLuis")
        .then(function(response){
        
        
            AmCharts.makeChart("chartdiv",
				{
					"type": "gauge",
					"marginBottom": 20,
					"marginTop": 40,
					"startDuration": 0,
					"fontSize": 13,
					"theme": "dark",
					"arrows": [
						{
							"id": "GaugeArrow-1",
							"value": 100
						}
					],
					"axes": [
						{
							"axisThickness": 1,
							"bottomText": "0 km/h",
							"bottomTextYOffset": -20,
							"endValue": 220,
							"id": "GaugeAxis-1",
							"valueInterval": 10,
							"bands": [
								{
									"alpha": 0.7,
									"color": "#00CC00",
									"endValue": 90,
									"id": "GaugeBand-1",
									"startValue": 0
								},
								{
									"alpha": 0.7,
									"color": "#ffac29",
									"endValue": 130,
									"id": "GaugeBand-2",
									"startValue": 90
								},
								{
									"alpha": 0.7,
									"color": "#ea3838",
									"endValue": 220,
									"id": "GaugeBand-3",
									"innerRadius": "95%",
									"startValue": 130
								}
							]
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": []
				}
			);
        });
        
    }]);