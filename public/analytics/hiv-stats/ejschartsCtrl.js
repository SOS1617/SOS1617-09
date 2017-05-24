/*global angular*/
/*global EJSC*/

angular
  .module("sos09-app")
  .controller("EJSChartsController", ["$scope", "$http", function($scope, $http) {
    $scope.url = "/api/v2/hiv-stats";
    console.log("chartist controller init OK");
    $http
      .get($scope.url + "?apikey=manuel").then(function(response) {
        var results = response.data;
        var names = [];
        var total = [];
        var incidence = [];
        for (var i = 0; i < results.length; i++) {
          names.push(results[i].country);
          total.push(results[i].total);
          incidence.push(results[i].incidence);
        }


    var chart = new EJSC.Chart("myChart4a", {
      show_legend: false
    } );
  
    var series1 = new EJSC.BarSeries(
        chart.addSeries(new EJSC.ArrayDataHandler(
                    new EJSC.ArrayDataHandler([
                        [$scope.country, "country"], //country
                        [$scope.year, "year"], //year
                        [$scope.incidence, "incidence"], //incidence
                        [$scope.total, "total"], //total
                        [$scope.percentage, "percentage"], //percentage

                    ]), {
                        orientation: "horizontal",
                        intervalOffset: .5,
                        useColorArray: true
                    }
))
      );
      /*
    var mySeries = new EJSC.BarSeries(
      new EJSC.ArrayDataHandler([[1,"Widgets"],[2,"Gizmos"],[3,"Doodads"],[4,"Thingies"]]) , {
          orientation: "horizontal",
          intervalOffset: .5,
          useColorArray: true
      }
    );
    */
    series1.x_axis_formatter = new EJSC.NumberFormatter({
        forced_decimals: 2
    } );
    
    series1.y_axis_formatter = new EJSC.NumberFormatter({
        forced_decimals: 2
    } );
  
    chart.addSeries(series1);
    
      });




  }]);
