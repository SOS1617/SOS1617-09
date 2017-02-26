var express = require("express");
var port = (process.env.PORT ||16700);
var app = express();


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

    dateFormat.masks.change = ' dS mmmm ';
    dateFormat.masks.line = ' yyyy, h:MM:ss' ; 
   
    var time1 = dateFormat(tim, "change");
    var time2 = dateFormat(tim, "line")
    
	res.write(time1 + "of" + time2 );
	res.end();

});