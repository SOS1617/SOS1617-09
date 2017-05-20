/*global angular*/
/*global Chartist*/
angular
  .module("sos09-app")
  .controller("chartistController", ["$scope", "$http", function($scope, $http) {
    $scope.url = "/api/v2/ticsathome-stats";
    console.log("chartist controller init OK");
    $http
      .get($scope.url + "?apikey=ticsathomeLuis").then(function(response) {
        var results = response.data;
        var names = [];
        var smartphones = [];
        var tablets = [];
        for (var i = 0; i < results.length; i++) {
          names.push(results[i].country);
          smartphones.push(results[i].smartphone);
          tablets.push(results[i].tablet);
        }




        new Chartist.Line('.ct-chart', {
          labels: names,
          // Naming the series with the series object array notation
          series: [{
            name: 'series-1',
            data: smartphones,
            color: 'blue'
          }, {
            name: 'series-2',
            data: tablets,
            stroke: '#4ECDC4'
          }]
        }, {
          fullWidth: true,
          // Within the series options you can use the series names
          // to specify configuration that will only be used for the
          // specific series.
          series: {
            'series-1': {
              lineSmooth: Chartist.Interpolation.step()
            },
            'series-2': {
              lineSmooth: Chartist.Interpolation.step(),
            }
          }
        }, [
          // You can even use responsive configuration overrides to
          // customize your series configuration even further!
          ['screen and (max-width: 320px)', {
            series: {
              'series-1': {
                lineSmooth: Chartist.Interpolation.none()
              },
              'series-2': {
                lineSmooth: Chartist.Interpolation.none(),
              }
            }
          }]
        ]);





      });




  }]);
