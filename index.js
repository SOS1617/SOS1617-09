
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var helmet = require("helmet");


var app = express();
var port = (process.env.PORT || 16778);
var datosManuel = [];
var statsVero =[];


app.use(bodyParser.json());
app.use(helmet());


app.use("/",express.static(path.join(__dirname,"public")));


app.listen(port, ()=> {
    console.log("Magic is happening in port"+port);
}).on("error",(e)=>{
    console.log("Server can noy be started"+e);
    process.exit(1);
});

/**************************API VERO*********************************/

var DataStore = require('nedb');
var MongoClient = require ('mongodb').MongoClient;
var url = 'mongodb://test:test@ds059316.mlab.com:59316/sandbox';

var dbVero = new DataStore({
    filename: dbFileName,
    autoload: true //el archivo se carga directamente en memoria
});
dbVero.find({}, function (err, statsVero) {
    console.log('INFO: Initialiting DB...');

    if (err) {
        console.error('WARNING: Error while getting initial data from DB');
        return 0;
    }
    if (statsVero.length === 0) {
        console.log('INFO: Empty DB, loading initial data');

        var statsVero = [{"country": "austria" , "year": "2010" , "usageinternet": "75.2", "usagephoneline": "40"},
{"country": "belgium," , "year": "2010" , "usageinternet": "75" , "usagephoneline": "42"},
{"country": "denmark" , "year": "2010" , "usageinternet": "88.7" , "usagephoneline": "47"}];
    
        dbVero.insert(statsVero);
    } else {
        console.log('INFO: DB has ' + statsVero.length + ' internetandphones-stats ');
    }
});


/*
console.log("---BEGIN PROBAR LA API CON CURL---");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats'");
console.log("curl -v -XPOST -H 'Content-type: application/json' -d '{ "country": "estonia", "year": "2010", "usageinternet": "74.1", "usagephoneline": "30" }' 'http://localhost:8080/api/v1/internetandphones-stats'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats/estonia'");
console.log("curl -v -XPUT -H 'Content-type: application/json' -d '{"country": "austria" , "year": "2010" , "usageinternet": "75.2", "usagephoneline": "40"}' 'http://localhost:8080/api/v1/internetandphones-stats'");
console.log("curl -v -XPUT -H 'Content-type: application/json' -d '{"country": "austria" , "year": "2010" , "usageinternet": "75.2", "usagephoneline": "40"}' 'http://localhost:8080/api/v1/internetandphones-stats/estonia'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats/estonia'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats/austria'");
console.log("curl -v -XDELETE -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats/austria'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats/austria'");
console.log("curl -v -XDELETE -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats'");
console.log("curl -v -XGET -H 'Content-type: application/json'  'http://localhost:8080/api/v1/internetandphones-stats'");
console.log("---END PROBAR LA API CON CURL---");
*/

var vero = "/api/v1/internetandphones-stats";

// Base GET
app.get(vero + "/loadInitialData" ,(request, response)=>{

 statsVero = [{"country": "austria" , "year": "2010" , "usageinternet": "75.2", "usagephoneline": "40"},
{"country": "belgium," , "year": "2010" , "usageinternet": "75" , "usagephoneline": "42"},
{"country": "denmark" , "year": "2010" , "usageinternet": "88.7" , "usagephoneline": "47"}];
    console.log("Datos creados con el get initialData");
    // aqui un insert a la base de datos mongoDB
 response.sendStatus(200);
   
});

// GET a collection
app.get(vero,(request, response)=> {
    
    console.log("INFO: New resquest to /internetandphones-stats");
    dbVero.find({},(err, statsVero)=>{
      if (err) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending contacts: " + JSON.stringify(statsVero, 2, null));
            response.send(statsVero);
        }
    });
});

//GET a un recurso
app.get(vero + "/:country",(request, response) =>{
    var country = request.params.country;
    if(!country){
        console.log("WARMING: There are noy any country");
        response.sendStatus(400);//bad request
    }else{
        console.log("INFO: New GET");//ABAJO dbVero.find({country:country},)
        var filteredCountry = statsVero.filter((s)=>{
            return (s.country.localeCompare(country,"en",{"sensitiviry":"base"})===0);
        
         });
         if(filteredCountry.length>0){
             var c = filteredCountry[0];
             console.log("INFO: Sending country");
             response.send(c);
        }else{
            console.log("WARMING: There are not any country with country" + country);
            response.sendStatus(404);//not found
        }
    }
});

//POST a collection
app.post(vero,(request, response)=> {
    var country = request.params.country;
    var newInternetandphones= request.body;
    if(!newInternetandphones){
        console.log("WARMING: New POST without Internetandphones");
        response.sendStatus(400);//bad request
    }else{
        console.log("INFO: New PORT with correct body");
        if(!newInternetandphones.country || !newInternetandphones.year || !newInternetandphones.usageinternet  || !newInternetandphones.usagephoneline){
            console.log("WARMING: New POST incorrect");
            response.sendStatus(422);//incorrecto
        }else{
            var internetandphonesBeforeInsertion=  statsVero.filter((i)=>{
                return (i.country.localeCompare(country,"en",{"sensitiviry":"base"})===0);
            });
            if(internetandphonesBeforeInsertion.length>0){
                console.log("WARMING: This data already exists");
                response.sendStatus(409);
            }else{
                console.log("INFO: adding Internetandphones");
                statsVero.push(newInternetandphones);
                response.sendStatus(201);
            }
        }
    }
});

//PUT a un recurso
app.update(vero +"/:country" ,(request, response) =>{ 
    var updateStat= request.body;
    var countryParam= request.params.country;
    statsVero= statsVero.map((c)=>{
        if(c.country===countryParam){//ESTADISTICA QUE VAMOS A MODIFICAR
            return updateStat;//si es igual al de parametro se actualiza y se devuelve la estadistica actualizada
            
        }else{//si es distinto lo deja igual y devulve la estadistica 
            return c;
        }
    });
    response.sendStatus(204);
    
    
});
//DELETE a un recurso
app.delete(vero+"/:country",(request, response) =>{
    var country = request.params.country;
    var a1= statsVero.length;
    statsVero=statsVero.filter((c)=>{
        return c.country!==country;
    });
    var a2= statsVero.length;
    if(a1==a2){
        response.sendStatus(404);
    }else{
        response.sendStatus(204);
    }
});
//DELETE a collection
app.delete(vero,(request, response)=>{
    statsVero.length=0;
    response.sendStatus(204);
});

//POST a un recurso
app.post(vero +"/:country",(request, response)=>{
    response.sendStatus(405);
});


//PUT a coleection
app.put(vero,(request, response) =>{
    response.sendStatus(405);
    
});



/**************************API MANUEL*********************************/
/*
var routeManuel = "/api/v1/hiv-stats";

var metodosManuel = require("./public/API/ApiManuel.js");

app.get(routeManuel + "/loadInitialData",metodosManuel.getCreateStats);
app.get(routeManuel,metodosManuel.getObtainStats);
app.get(routeManuel + "/:name",metodosManuel.getData);

app.post(routeManuel,metodosManuel.postNewData);
app.post(routeManuel + "/:name",metodosManuel.badpost);

app.put(routeManuel , metodosManuel.badPut);
app.put(routeManuel + "/:name", metodosManuel.putData);

app.delete(routeManuel,metodosManuel.deleteCollection);
app.delete(routeManuel + "/:country" , metodosManuel.deleteData);

*/


