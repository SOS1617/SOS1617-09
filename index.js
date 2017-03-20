
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var helmet = require("helmet");


var app = express();
var port = (process.env.PORT || 16778);
var datosManuel = [];


app.use(bodyParser.json());
app.use(helmet());


app.use("/",express.static(path.join(__dirname,"public")));


app.listen(port, ()=> {
    console.log("Magic is happening in port"+port);
}).on("error",(e)=>{
    console.log("Server can noy be started"+e);
    process.exit(1);
});




/**************************API MANUEL*********************************/

var routeManuel = "/api/v1/hiv-stats";


//Creación de los datos

app.get(routeManuel + "/loadInitialData" ,(req,res) =>{
    
    
 datosManuel = [   
{ "country" : "estonia" , 	"year" : "2013"	,"incidence" : "325" ,	"total" : "8702"	, "percentage" : "24,6"},
{"country" : "latvia" , 	"year" : "2013"	,"incidence" : "340" ,	"total" : "5867"	, "percentage" : "16,8"},
{"country" : "portugal" , 	"year" : "2013"	,"incidence" : "1093" ,	"total" : "47390"	, "percentage" : "10,4"},
{"country" : "belgium" , 	"year" : "2013"	,"incidence" : "1115" ,	"total" : "266850"	, "percentage" : "10,0"}
];
    console.log("Datos creados con el get initialData");
    // aqui un insert a la base de datos mongoDB
 res.sendStatus(200);
    
});


//GET a coleccion de datos

app.get(routeManuel, (req,res) => {
    
   if(datosManuel.length === 0){
       
       res.sendStatus(404);
       console.log("no hay ningún dato creado");
   }else{
   
    res.send(datosManuel);
    console.log("Get a coleccion realizado");
    
    res.sendStatus(200);
   }
    
});



//GET a un recurso en concreto 

app.get(routeManuel + "/:name",(req,res)=> {
    
    var nombre = req.params.name; 
    
    if(nombre.length === 0){
        res.sendStatus(400); //Petición mal hecha
        console.log("algo para con el parámetro de búsqueda que le he pasado");
    }else{
        
       var resultado =  datosManuel.filter(datosManuel.country === nombre);
       res.send(resultado);
       res.sendStatus(200);
        
    }
    
});



