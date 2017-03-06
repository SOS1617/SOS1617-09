var express = require("express");
var port = (process.env.PORT || 16778);
var path = require("path");
var app = express();


app.use("/",express.static(path.join(__dirname,"public")));

app.get("/hello", (req, res) => {
    res.send("Hello");

});


app.listen(port, () => {

    console.log("Server initialized on port" + port);
}).on("error",(e)=>{
     console.log("Error initializing on port" + e);
     process.exit(1);
});





















/*
app.listen(port,(err)=>{
   
   if(!err)
        console.log("Server initialized in port "+ port);
    else
        console.log("ERROR to initialized the server");
    
});

app.get("/",(req,res)=>{
    
    res.send("<html> <h1> Tienes que poner el /time al final de este enlace para ver el lo de la hora </h1></html>")
    
});


app.get("/time", (req,res) => {
    var dateFormat = require('dateformat');
    var tim = new Date();
    tim.setHours(tim.getHours() +1);

    dateFormat.masks.change = ' dS mmmm ';
    dateFormat.masks.line = ' yyyy, h:MM:ss' ; 
   
    var time1 = dateFormat(tim, "change");
    var time2 = dateFormat(tim, "line")
    
	res.write(time1 + "of" + time2 );
	res.end();

});*/