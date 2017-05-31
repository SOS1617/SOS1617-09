/*global angular*/
/*global zingchart*/

angular
    .module("sos09-app")
    .controller("G02Controller", ["$scope", "$http", function($scope, $http) {
        var G02Result = [];
        var rpc = [];
        var smartphones = [];
        var countries = [];

        $http.get("https://sos1617-02.herokuapp.com/api/v1/rpc-stats/?apikey=GVAODcH3").then(function(response) {
            G02Result = response.data;

        });


        $http.get("/api/v3/ticsathome-stats").then(function(response) {

            for (var i = 0; i < response.data.length; i++) {
                for (var j = 0; j < G02Result.length; j++) {
                    if (response.data[i].year == parseInt(G02Result[j].year)) {
                        countries.push(response.data[i].country);
                        rpc.push(G02Result[j].rpcvariation);
                        smartphones.push(response.data[i].smartphone);
                    }

                }
            }

console.log(countries);
console.log(rpc);
console.log(smartphones);
        var myConfig = {
    "type":"bar3d",
    "background-color":"#fff",
    "3d-aspect":{
        "true3d":0,
        "y-angle":10,
        "depth":30
    },
    "title":{
        "text":"Rent per capita & smartphones",
        "height":"40px",
        "font-weight":"normal",
        "text-color":"#ffffff"
    },
    "legend":{
        "layout":"float",
        "background-color":"none",
        "border-color":"none",
        "item":{
            "font-color":"#333"
        },
        "x":"37%",
        "y":"10%",
        "width":"90%",
        "shadow":0
    },
    "plotarea":{
        "margin":"95px 35px 50px 70px",
        "background-color":"#fff",
        "alpha":0.3
    },
    "scale-y":{
        "background-color":"#fff",
        "border-width":"1px",
        "border-color":"#333",
        "alpha":0.5,
        "format":"$%v",
        "guide":{
            "line-style":"solid",
            "line-color":"#333",
            "alpha":0.2
        },
        "tick":{
            "line-color":"#333",
            "alpha":0.2
        },
        "item":{
            "font-color":"#333",
            "padding-right":"6px"
        }
    },
    "scale-x":{
        "background-color":"#fff",
        "border-width":"1px",
        "border-color":"#333",
        "alpha":0.5,
        "values":countries,
        "guide":{
            "visible":false
        },
        "tick":{
            "line-color":"#333",
            "alpha":0.2
        },
        "item":{
            "font-size":"11px",
            "font-color":"#333"
        }
    },
    "series":[
        {
            "values":rpc,
            "text":"RPC",
            "background-color":"#03A9F4 #4FC3F7",
            "border-color":"#03A9F4",
            "legend-marker":{
                "border-color":"#03A9F4"
            },
            "tooltip":{
                "background-color":"#03A9F4",
                "text":"%v",
                "font-size":"12px",
                "padding":"6 12",
                "border-color":"none",
                "shadow":0,
                "border-radius":5
            }
        },
        {
            "values":smartphones,
            "text":"SMARTPHONES",
            "background-color":"#673AB7 #9575CD",
            "border-color":"#673AB7",
            "legend-marker":{
                "border-color":"#673AB7"
            },
            "tooltip":{
                "background-color":"#673AB7",
                "text":"%v",
                "font-size":"12px",
                "padding":"6 12",
                "border-color":"none",
                "shadow":0,
                "border-radius":5
            }
        }
    ]
};

zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height: 500, 
	width: 725,
	defaults:{
	  'font-family':'sans-serif'
	}
});
        });


    }]);
