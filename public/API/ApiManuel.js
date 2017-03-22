

var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://manu:admin@ds137730.mlab.com:37730/sos1617"

var db;

/**************************LOAD INITIAL DATA ****************/

module.exports.getCreateStats = (req,res) => {

    mongoClient.connect(mongoURL,{native_parser:true}, (error,database)=>{
    
    if(error){
        console.log("No podemos usar la base de datos" + error);
        process.exit();
    }

     db = database.collection("hiv-stats");
     
     
     db.insert([
			     { "country" : "estonia" , 	"year" : 2013	,"incidence" : 325 ,	"total" : 8702	, "percentage" : 24.6},
                 {"country" : "latvia" , 	"year" : 2013	,"incidence" : 340 ,	"total" : 5867	, "percentage" : 16.8},
                 {"country" : "portugal" , 	"year" : 2013	,"incidence" : 1093 ,	"total" : 47390	, "percentage" : 10.4},
                 {"country" : "belgium" , 	"year" : 2013	,"incidence" : 1115 ,	"total" : 266850	, "percentage" : 10.0}
			    ]);
         
       console.log("OK");
			res.sendStatus(201);
     
});
 
    	
      
		
			    
};


/**********************GET********************/

//Get conjunto datos


    // GET a collection
module.exports.getObtainStats = (req, res) => {
    
    console.log("INFO: New GET request to /hiv-stats");
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
            console.log("INFO: Sending contacts: " + JSON.stringify(data, 2, null));
            res.send(data);
        }
    });
    
    }
};


//GET a un recurso en concreto 

module.exports.getData =  function (req, res) {
   
    var nameParam = req.params.name;
    var aux = [];
    
    if (!nameParam) {
        console.log("BAD Request,try again with new data");
        res.sendStatus(400); // bad request
        
    } else if(!db)
    { 
        res.sendStatus(404);
        }
        else {
            db.find({}).toArray(function(error,conjunto){  
                
                if(conjunto.length === 0){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                    
                    for(var i = 0;i<conjunto.length;i++){
                        
                        if(conjunto[i].country === nameParam){
                            aux.push(conjunto[i]);
                        }
                    }
                    
                    if(aux.length === 0){
                        res.sendStatus(404);
                    }
                    res.send(aux);
                    
                }
                
            } );
                
                
            
    }
};


/**********************POST********************/

//POST a un conjunto 

module.exports.postNewData =  (req,res) =>{
    
    var nuevoDato = req.body;
    var sol = false;
    
    if(!nuevoDato){
        
        res.sendStatus(400); //BAD REQUEST
        
    }else if(!nuevoDato.country || !nuevoDato.year || !nuevoDato.incidence || !nuevoDato.percentage || !nuevoDato.total){
        
     res.sendStatus(400);
     console.log("falta algún parámetro del dato que queremos insertar");
        
        
    }else {
            db.find({}).toArray(function(error,conjunto){  
                
                if(conjunto.length === 0){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                    
                    for(var i = 0;i<conjunto.length;i++){
                        
                        if(conjunto[i].country === nuevoDato.country){
                            res.sendStatus(409);
                            console.log("Error,el dato ya estaba en el conjunto");
                            sol = true;
                        }
                    }
                    
                  if(sol === false){
                      db.insert(nuevoDato);
                      
                  }  
                }
                
            } );
                
                
            
    }    
    
};


//POST a un recurso en concreto 


module.exports.badpost = (req,res) =>{
    
    res.sendStatus(405); //Method Not Allowed
    
    console.log("No se puede hacer un post a un recurso en concreto");
};


/**********************PUT************************/


//PUT a una coleccion de datos

module.exports.badPut = (req,res)=> {
    
    res.sendStatus(405);
    console.log("No se puede hacer un put a una coleccion de datos");
};


//PUT a un recurso en concreto

module.exports.putData = (req,res)=>{
    
     var actualiza= req.body;
     
    if(!actualiza){
        
        res.sendStatus(400); //BAD REQUEST
        
    }else if(!actualiza.country || !actualiza.year || !actualiza.incidence || !actualiza.percentage || !actualiza.total){
        
     res.sendStatus(400);
     console.log("falta algún parámetro del dato que queremos insertar");
        
        
    }else {

        db.update({country: actualiza.country },
        {
            country:actualiza.country ,
            year : actualiza.year , 
            incidence : actualiza.incidence , 
            total : actualiza.total ,
            percentage : actualiza.percentage
            
        }) ;
    }  
    
};


/*********************DELETE********************/


//DELETE a una colección de datos

module.exports.deleteCollection = (req,res)=>{
    
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


