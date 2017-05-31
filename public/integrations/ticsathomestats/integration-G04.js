/*global angular*/



angular
    .module("sos09-app")
    .controller("G04Controller", ["$scope", "$http", function($scope, $http) {
        var G04Result = [];
        var education = ['invEducation'];
        var smartphones = ['smartphone'];
        var countries = ['data3'];

        $http.get("https://sos1617-06.herokuapp.com/api/v2/gdp/").then(function(response) {
            G04Result = response.data.toLowerCase();
           

        });


        $http.get("/api/v3/ticsathome-stats").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < G04Result.length; j++) {
                    if (response.data[i].country == G04Result[j].country) {
                       
                        countries.push(response.data[i].country);
                        education.push(parseInt(G04Result[j].population));
                        smartphones.push(response.data[i].smartphone);
                    }

                }
            }

/*console.log(countries);
console.log(education);
console.log(smartphones);*/
       
window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
        text: "Olympic Medals of all Times (till 2012 Olympics)"
      },
      animationEnabled: true,
      legend: {
        cursor:"pointer",
        itemclick : function(e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
          }
          else {
              e.dataSeries.visible = true;
          }
          chart.render();
        }
      },
      axisY: {
        title: "Medals"
      },
      toolTip: {
        shared: true,  
        content: function(e){
          var str = '';
          var total = 0 ;
          var str3;
          var str2 ;
          for (var i = 0; i < e.entries.length; i++){
            var  str1 = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ; 
            total = e.entries[i].dataPoint.y + total;
            str = str.concat(str1);
          }
          str2 = "<span style = 'color:DodgerBlue; '><strong>"+e.entries[0].dataPoint.label + "</strong></span><br/>";
          str3 = "<span style = 'color:Tomato '>Total: </span><strong>" + total + "</strong><br/>";
          
          return (str2.concat(str)).concat(str3);
        }

      },
      data: [
      {        
        type: "bar",
        showInLegend: true,
        name: "Gold",
        color: "gold",
        dataPoints: [
        { y: 198, label: "Italy"},
        { y: 201, label: "China"},
        { y: 202, label: "France"},        
        { y: 236, label: "Great Britain"},        
        { y: 395, label: "Soviet Union"},        
        { y: 957, label: "USA"}        


        ]
      },
      {        
        type: "bar",
        showInLegend: true,
        name: "Silver",
        color: "silver",          
        dataPoints: [
        { y: 166, label: "Italy"},
        { y: 144, label: "China"},
        { y: 223, label: "France"},        
        { y: 272, label: "Great Britain"},        
        { y: 319, label: "Soviet Union"},        
        { y: 759, label: "USA"}        


        ]
      },
      {        
        type: "bar",
        showInLegend: true,
        name: "Bronze",
        color: "#A57164",
        dataPoints: [
        { y: 185, label: "Italy"},
        { y: 128, label: "China"},
        { y: 246, label: "France"},        
        { y: 272, label: "Great Britain"},        
        { y: 296, label: "Soviet Union"},        
        { y: 666, label: "USA"}    

        ]
      }

      ]
    });

chart.render();
}

        });


    }]);
