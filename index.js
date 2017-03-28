
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var helmet = require("helmet");


var app = express();
var port = (process.env.PORT || 16778);


app.use(bodyParser.json());
app.use(helmet());


app.use("/",express.static(path.join(__dirname,"public")));


app.listen(port, ()=> {
    console.log("Magic is happening in port"+port);
}).on("error",(e)=>{
    console.log("Server can noy be started"+e);
    process.exit(1);
});



/***HTML PARA EL BOTÓN DEL TEST DE POSTMAN **/

app.use("/api/v1/test",express.static(path.join(__dirname,"./public/API/Test.html")));



/**************************API MANUEL*********************************/

var routeManuel = "/api/v1/hiv-stats";

var metodosManuel = require("./public/API/ApiManuel.js");

app.get(routeManuel + "/loadInitialData",metodosManuel.getCreateStats);
app.get(routeManuel,metodosManuel.getObtainStats);
app.get(routeManuel + "/:name",metodosManuel.getDataName);
app.get(routeManuel + "/:name/:year",metodosManuel.getDataNameYear);
app.post(routeManuel,metodosManuel.postNewData);
app.post(routeManuel + "/:name",metodosManuel.badpost);
app.post(routeManuel + "/:name/:year",metodosManuel.badpost);

app.put(routeManuel , metodosManuel.badPut);
app.put(routeManuel + "/:name", metodosManuel.putData);
app.put(routeManuel + "/:name/:year", metodosManuel.putTwoData);

app.delete(routeManuel,metodosManuel.deleteCollection);
app.delete(routeManuel + "/:country" , metodosManuel.deleteData);
app.delete(routeManuel + "/:country/:year" , metodosManuel.deleteTwoData);



/***API LUIS*****/

var urlDir = "/api/v1/ticsathome-stats";
var funciones = require("./public/API/ApiLuis.js");


app.get(urlDir + "/loadInitialData",funciones.getNewStats);
app.get(urlDir,funciones.getGeneral);
app.get(urlDir+ "/:country",funciones.getSpecific);


app.put(urlDir,funciones.errorInPut);
app.put(urlDir+ "/:country",funciones.putSpecific);

app.post(urlDir,funciones.postGeneral);
app.post(urlDir+ "/:country",funciones.errorInPost);

app.delete(urlDir,funciones.deleteStats);
app.delete(urlDir+ "/:country",funciones.deleteData);





/*****************************API VERO*********************************/

var vero = "/api/v1/internetandphones-stats";
var metodosVero = require("./public/API/ApiVero.js");

app.get(vero + "/loadInitialData",metodosVero.getLoadInitial);
app.get(vero,metodosVero.getCollection);
app.get(vero + "/:country",metodosVero.getRecurso);


app.post(vero,metodosVero.postCollection);
app.post(vero +"/:country",metodosVero.postRecurso);

app.put(vero,metodosVero.putCollection);
app.put(vero +"/:country" ,metodosVero.putRecurso); 


app.delete(vero,metodosVero.deleteCollection);
app.delete(vero+"/:country",metodosVero.deleteRecurso);











