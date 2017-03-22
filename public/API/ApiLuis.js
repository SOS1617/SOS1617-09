

var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://lpontegc:test@ds137340.mlab.com:37340/sos-lpontegc"

var db;

/**************************LOAD INITIAL DATA ****************/

module.exports.getNewStats = (req,res) => {

    mongoClient.connect(mongoURL,{native_parser:true}, (error,database)=>{
    
    if(error){
        console.log("No podemos usar la base de datos" + error);
        process.exit();
    }

     db = database.collection("ticsathome-stats");
     
     
     db.insert([
			     { "country" : "germany" , 	"year" : 2016	,"smartphone" : 30 ,	"tablet" : 18	},
                 {"country" : "belgium" , 	"year" : 2016	,"smartphone" : 23 ,	"tablet" : 16},
                 {"country" : "spain" , 	"year" : 2016	,"smartphone" : 40 ,	"tablet" : 24},
                 {"country" : "france" , 	"year" : 2016	,"smartphone" : 22 ,	"tablet" : 17}
			    ]);
         
       console.log("OK");
			res.sendStatus(201);
     
});
 
    	
      
		
			    
};


/**********************GET********************/

//Get conjunto datos


    // GET a collection
module.exports.getStats = (req, res) => {
    
    console.log("INFO: New GET request to /ticsathome-stats");
    if(!db){
        console.log("No hay nada en la base de datos");
        res.sendStatus(404);
    }else{
    
    db.find({}).toArray( function (err, data) {
        if (err) {
            console.error('ERROR from database');
            res.sendStatus(500); // internal server error
        } else {
            if(data.length === 0){
                res.sendStatus(404);
            }
            console.log("INFO: Sending stats: " + JSON.stringify(data, 2, null));
            res.send(data);
        }
    });
    
    }
};


//GET a un recurso en concreto 

module.exports.getData =  function (req, res) {
   
    var nameParam = req.params.name;
    var arr = [];
    
    if (!nameParam) {
        console.log("BAD Request,try again with new data");
        res.sendStatus(400); // bad request
        
    } else if(!db)
    { 
        res.sendStatus(404);
        }
        else {
            db.find({}).toArray(function(error,stat){  
                
                if(stat.length === 0){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                    
                    for(var i = 0;i<stat.length;i++){
                        
                        if(stat[i].country === nameParam){
                            arr.push(stat[i]);
                        }
                    }
                    
                    if(arr.length === 0){
                        res.sendStatus(404);
                    }
                    res.send(arr);
                    
                }
                
            } );
                
                
            
    }
};


/**********************POST********************/

//POST a un conjunto 

module.exports.postNewStat =  (req,res) =>{
    
    var newData = req.body;
    var sol = false;
    
    if(!newData){
        
        res.sendStatus(400); //BAD REQUEST
        
    }else if(!newData.country || !newData.year || !newData.smartphone || !newData.tablet){
        
     res.sendStatus(400);
     console.log("falta algún parámetro del dato que queremos insertar");
        
        
    }else {
            db.find({}).toArray(function(error,stat){  
                
                if(stat.length === 0){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                    
                    for(var i = 0;i<stat.length;i++){
                        
                        if(stat[i].country === stat.country){
                            res.sendStatus(409);
                            console.log("Error,el dato ya estaba en el conjunto");
                            sol = true;
                        }
                    }
                    
                  if(sol === false){
                      db.insert(newData);
                      
                  }  
                }
                
            } );
                
                
            
    }    
    
};


//POST a un recurso en concreto 


module.exports.errorInPost = (req,res) =>{
    
    res.sendStatus(405); //Method Not Allowed
    
    console.log("No se puede hacer un post a un recurso en concreto");
};


/**********************PUT************************/


//PUT a una coleccion de datos

module.exports.errorInPut = (req,res)=> {
    
    res.sendStatus(405);
    console.log("No se puede hacer un put a una coleccion de datos");
};


//PUT a un recurso en concreto

module.exports.putInsertData = (req,res)=>{
    
     var actualiza= req.body;
     
    if(!actualiza){
        
        res.sendStatus(400); //BAD REQUEST
        
    }else if(!actualiza.country || !actualiza.year || !actualiza.smartphone || !actualiza.tablet){
        
     res.sendStatus(400);
     console.log("falta algún parámetro del dato que queremos insertar");
        
        
    }else {

        db.update({country: actualiza.country },
        {
            country:actualiza.country ,
            year : actualiza.year , 
            smartphone : actualiza.smartphone , 
            tablet : actualiza.tablet
            
        }) ;
    }  
    
};


/*********************DELETE********************/


//DELETE a una colección de datos

module.exports.deleteStats = (req,res)=>{
    
   db.remove({}, {multi: true}, function (err, borr) {
        if (err) {
            console.error('Error no funciona el Delete de toda la coleccion');
            res.sendStatus(500); // internal server error
        } else {
            if (borr > 0) {
                console.log("Todo borrado ");
                res.sendStatus(204); // no content
            } else {
                console.log("No hay contactos que borrar");
                res.sendStatus(404); // not found
            }
        }
    });
    
};

//DELETE a un recurso en concreto

module.exports.deleteData = (req,res)=>{
    
    var country = req.params.country;

    if(!country ){
        res.sendStatus(404);
        
    }else {
            db.remove({country : country},function(error,conjunto){  
                
                if(error){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                   
                    console.log("El dato se ha borrado satisfactoriamente");  
                    
                }
                
            });
                
                
            
    }
};


