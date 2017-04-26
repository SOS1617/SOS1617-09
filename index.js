
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

app.use("/api/v1/tests",express.static(path.join(__dirname,"./public/API/Test.html")));



/**************************API MANUEL*********************************/


var routeManuel = "/api/v1/hiv-stats";

var metodosManuel = require("./public/API/ApiManuel/v1/ApiManuel.js");

app.get(routeManuel + "/loadInitialData",metodosManuel.getCreateStats);
app.get(routeManuel,metodosManuel.getObtainStats);
app.get(routeManuel + "/:name",metodosManuel.getDataName);
app.get(routeManuel + "/:name/:year",metodosManuel.getDataNameYear);

app.post(routeManuel,metodosManuel.postNewData);
app.post(routeManuel + "/:name",metodosManuel.badpost);
app.post(routeManuel + "/:name/:year",metodosManuel.badpost);

app.put(routeManuel , metodosManuel.badPut);
app.put(routeManuel + "/:name", metodosManuel.badPut);
app.put(routeManuel + "/:name/:year", metodosManuel.putTwoData);

app.delete(routeManuel,metodosManuel.deleteCollection);
app.delete(routeManuel + "/:country" , metodosManuel.deleteData);
app.delete(routeManuel + "/:country/:year" , metodosManuel.deleteTwoData);

var routeManuel2 = "/api/v2/hiv-stats";

var metodosManuel2 = require("./public/API/ApiManuel/v2/ApiManu.js");

app.get(routeManuel2 + "/loadInitialData",metodosManuel2.getCreateStats);
app.get(routeManuel2,metodosManuel2.getObtainStats);
app.get(routeManuel2 + "/:name",metodosManuel2.getDataName);
app.get(routeManuel2 + "/:name/:year",metodosManuel2.getDataNameYear);

app.post(routeManuel2,metodosManuel2.postNewData);
app.post(routeManuel2 + "/:name",metodosManuel2.badpost);
app.post(routeManuel2 + "/:name/:year",metodosManuel2.badpost);

app.put(routeManuel2 , metodosManuel2.badPut);
app.put(routeManuel2 + "/:name", metodosManuel2.badPut);
app.put(routeManuel2 + "/:name/:year", metodosManuel2.putTwoData);

app.delete(routeManuel2,metodosManuel2.deleteCollection);
app.delete(routeManuel2 + "/:country" , metodosManuel2.deleteData);
app.delete(routeManuel2 + "/:country/:year" , metodosManuel2.deleteTwoData);





/***API LUIS*****/

var urlDir = "/api/v1/ticsathome-stats";
var funciones = require("./public/API/ApiLuis/v1/ApiLuis.js");

var urlDirv2 = "/api/v2/ticsathome-stats";
var funcionesv2 = require("./public/API/ApiLuis/v2/ApiLuis.js");


app.get(urlDir + "/loadInitialData",funciones.getNewStats);
app.get(urlDir,funciones.getGeneral);
app.get(urlDir+ "/:country",funciones.getOneParam);
app.get(urlDir+ "/:country/:year",funciones.getTwoSpecific);

app.put(urlDir,funciones.errorInPut);
app.put(urlDir+ "/:country",funciones.putSpecific);
app.put(urlDir+ "/:country/:year",funciones.putTwoSpecific);

app.post(urlDir,funciones.postGeneral);
app.post(urlDir+ "/:country",funciones.errorInPost);
app.post(urlDir+ "/:country/:year",funciones.errorInPost);

app.delete(urlDir,funciones.deleteStats);
app.delete(urlDir+ "/:country",funciones.deleteOne);
app.delete(urlDir+ "/:country/:year",funciones.deleteTwo);


/********V2***********/


app.get(urlDirv2 + "/loadInitialData",funcionesv2.getNewStats);
app.get(urlDirv2,funcionesv2.getGeneral);
app.get(urlDirv2+ "/:country",funcionesv2.getOneParam);
app.get(urlDirv2+ "/:country/:year",funcionesv2.getTwoSpecific);

app.put(urlDirv2,funcionesv2.errorInPut);
app.put(urlDirv2+ "/:country",funcionesv2.putSpecific);
app.put(urlDirv2+ "/:country/:year",funcionesv2.putTwoSpecific);

app.post(urlDirv2,funcionesv2.postGeneral);
app.post(urlDirv2+ "/:country",funcionesv2.errorInPost);
app.post(urlDirv2+ "/:country/:year",funcionesv2.errorInPost);

app.delete(urlDirv2,funcionesv2.deleteStats);
app.delete(urlDirv2+ "/:country",funcionesv2.deleteOne);
app.delete(urlDirv2+ "/:country/:year",funcionesv2.deleteTwo);




/*****************************API VERO*********************************/

var vero = "/api/v1/internetandphones-stats";
var metodosVero = require("./public/API/ApiVero.js");

app.get(vero + "/loadInitialData",metodosVero.getLoadInitial);
app.get(vero,metodosVero.getCollection);
app.get(vero + "/:country",metodosVero.getRecurso);
app.get(vero + "/:country/:year",metodosVero.getRecursoDosParametros);

app.post(vero,metodosVero.postCollection);
app.post(vero +"/:country",metodosVero.postRecurso);


app.put(vero,metodosVero.putCollection);
app.put(vero +"/:country" ,metodosVero.putRecurso);
app.put(vero +"/:country/:year" ,metodosVero.putRecursoDosParametros);

app.delete(vero,metodosVero.deleteCollection);
app.delete(vero+"/:country",metodosVero.deleteRecurso);
app.delete(vero+"/:country/:year",metodosVero.deleteRecursoDosParametros);











