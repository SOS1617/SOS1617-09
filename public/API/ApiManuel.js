

var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://manu:admin@ds137730.mlab.com:37730/sos1617"

var db;

/**************************LOAD INITIAL DATA ****************/

module.exports.getCreateStats = (req,res) => {

    mongoClient.connect(mongoURL,{native_parser:true}, (error,database)=>{
    
    if(error){
        console.log("No podemos usar la base de datos" + error);
            res.sendStatus(500); // internal server error
    }

     db = database.collection("hiv-stats");
      
      db.find({}).toArray(function(error, conjunto){
      if (error) {
            console.error(' Error from DB');
            res.sendStatus(500); // internal server error
        } else {
            
            if(conjunto.length !== 0){ //Si mi base de datos está ya vacía
                res.sendStatus(200);//OK,la base de datos ya contenía datos,por lo que ya está inicializada
                
            }else{
     db.insert([
			     { "country" : "estonia" , 	"year" : 2013	,"incidence" : 325 ,	"total" : 8702	, "percentage" : 24.6},
                 {"country" : "latvia" , 	"year" : 2013	,"incidence" : 340 ,	"total" : 5867	, "percentage" : 16.8},
                 {"country" : "portugal" , 	"year" : 2013	,"incidence" : 1093 ,	"total" : 47390	, "percentage" : 10.4},
                {"country" : "portugal" , 	"year" : 2014	,"incidence" : 1433 ,	"total" : 49050	, "percentage" : 11.2},
                 {"country" : "belgium" , 	"year" : 2013	,"incidence" : 1115 ,	"total" : 266850	, "percentage" : 10.0}
			    ]);
			    
			       console.log("OK");
			res.sendStatus(201);
			    
            }
        
        }
      });
    
     
});

    
}
    	

/**********************GET********************/

//Get conjunto datos

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


//GET a un recurso en concreto por el nombre

module.exports.getDataName =  function (req, res) {
   
    var Param = req.params.name;
    var aux = [];
    
    if (!Param) {
        console.log("BAD Request,try again with new data");
        res.sendStatus(400); // bad request
        
    } else if(!db)
    { 
        res.sendStatus(404);//Base de datos está vacía
        }
        else {
            db.find({}).toArray(function(error,conjunto){  
                
                if(conjunto.length === 0){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                 
                 aux = encuentraName(conjunto,aux,Param );

                    if(aux.length === 0){
                        res.sendStatus(404);
                    }else{
                    res.send(aux);
                    }  
                }
                
            } );
                
                
            
    }
};

//GET A UN RECURSO POR NOMBRE Y AÑO

module.exports.getDataNameYear =  function (req, res) {
    
    var nombre = req.params.name;
    var year = req.params.year;
    var aux = [];
    
    if (!nombre || !year) {
        console.log("BAD Request,try again with new data");
        res.sendStatus(400); // bad request
        
    } else if(!db)
    { 
        res.sendStatus(404);//Base de datos está vacía
        }
        else {
            db.find({}).toArray(function(error,conjunto){  
                
                if(conjunto.length === 0){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                 
                 for(var j = 0;j<conjunto.length;j++){
                     
                     var helpp = conjunto[j];
                     if (isNaN(nombre) && isNaN(parseInt(year)) === false){
                        if(helpp.country == nombre && helpp.year == parseInt(year)){
		                	aux.push(helpp);
                     
                        }
                         
                     } 
                 }

                    if(aux.length === 0){
                        res.sendStatus(404);
                    }
                    res.send(aux);
                    
                }
                
            } );
                
                
            
    }
    
}



/**********************POST********************/

//POST a un conjunto 

module.exports.postNewData =  (req,res) =>{
    
    var nuevoDato = null;
    nuevoDato = req.body;
    var sol = false;
    
    if(nuevoDato == null){
        
        res.sendStatus(400); //BAD REQUEST
        
    }else if(!nuevoDato.country || !nuevoDato.year || !nuevoDato.incidence || !nuevoDato.percentage || !nuevoDato.total){
        
     res.sendStatus(400);
     console.log("something wrong in your data post,bad request");
        
        
    }else { 
            db.find({}).toArray(function(error,conjunto){  
                
                if(conjunto.length === 0){
                    console.log("DB empty");
                    res.sendStatus(404);
                }else{
                    
                    for(var i = 0;i<conjunto.length;i++){
                        
                        if(conjunto[i].country === nuevoDato.country && conjunto[i].year === parseInt(nuevoDato.year)){
                            res.sendStatus(409);
                            console.log("Error,el dato ya estaba en el conjunto");
                            sol = true;
                        }
                    }
                    
                  if(sol === false){
                      db.insert(nuevoDato);
                      res.sendStatus(201);//CREATED 
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
     var country = req.params.name;
     var year = req.params.year;
     
   if(!actualiza.country || !actualiza.year || !actualiza.incidence || !actualiza.percentage || !actualiza.total){
        
     res.sendStatus(400);
     console.log("falta algún parámetro del dato que queremos insertar");
        
        
    }else   if(actualiza.name !== country){
        
        res.sendStatus(400);
        
    }   

    
    else{
      if(!year){
        if(country.name === actualiza.name){
        db.update({country: country},
        {
            country:actualiza.country ,
            year : actualiza.year , 
            incidence : actualiza.incidence , 
            total : actualiza.total ,
            percentage : actualiza.percentage
            
        }) ;
        res.send(200); //OK
       
    }
    }else{ 
        if(country.name === actualiza.name){
            
             db.update({country: country,year : year},
        {
            country:actualiza.country ,
            year : actualiza.year , 
            incidence : actualiza.incidence , 
            total : actualiza.total ,
            percentage : actualiza.percentage
            
        }) ;
        res.send(200); //OK
        }
    
    }  
    
    
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
                res.sendStatus(204);  // no content
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
                    res.sendStatus(200);
                }
                
            });
                
                
            
    }
};

module.exports.deleteTwoData = (req,res)=>{
    
    var country = req.params.country;
    var year = parseInt(req.params.year);

    if(!country ){
        res.sendStatus(404);
        
    }else {
            db.remove({country : country , year : year},function(error,conjunto){  
                
                if(error){
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }else{
                   
                    console.log("El dato se ha borrado satisfactoriamente");  
                    res.sendStatus(200);
                }
                
            });
                
                
            
    }
};


/*************************FUNCIONES AUXILIARES*******************************/




var encuentraName = function(conjunto,conjaux,parametro){
    
    if(parametro ){
        for(var i = 0;i<conjunto.length;i++){
                        
            if(conjunto[i].country === parametro){
                 conjaux.push(conjunto[i]);
            }else if (conjunto[i].year === parseInt(parametro)){
                
                conjaux.push(conjunto[i]);
            }
        }
        
    } 
    
    return conjaux;
};


