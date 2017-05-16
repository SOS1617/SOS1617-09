/*global angular*/
/*global google*/
angular
    .module("sos09-app")
    .controller("InternetStatsWidgets", ["$http", function($http) {
        console.log("Controller initialized");
        var url = "http://sos1617-09.herokuapp.com/api/v2/internetandphones-stats";
        var apikey = "apikey=internetstats";
        $http.get(url + "/?" + apikey).then(function(response) {
            
            google.charts.load('current', {
                'packages': ['geochart']
            });
            google.charts.setOnLoadCallback(drawMarkersMap);

            var internetandphones = [];
            internetandphones.push(['Country', 'Usageinternet', 'Usagephoneline']);
            response.data.forEach((x) => {
                internetandphones.push([x.country, x.usageinternet, x.usagephoneline]);
            });

            function drawMarkersMap() {
                var data = google.visualization.arrayToDataTable(internetandphones);

                var options = {
                    datalessRegionColor:'#A9D0F5',
                    backgroundColor: '#FAFAFAF',
                    region:150,
                   
                    colorAxis: {
                        colors: ['#A4A4A4', '#00BFFF']
                    },
                    resolution: 'countries'
                };

                var chart = new google.visualization.GeoChart(document.getElementById('Gchart'));
                chart.draw(data, options);
            }
        
    });
}]);