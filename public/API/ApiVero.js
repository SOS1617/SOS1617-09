var mongoClient = require ('mongodb').MongoClient;

var url = 'mongodb://kkdekiki:232323@ds137360.mlab.com:37360/internetandphones-stats';

var db1;
var exports= module.exports={};


mongoClient.connect(url,{native_parser:true}, (error,database)=>{
    
    if(error){
        console.log("No podemos usar la base de datos" + error);
          process.exit();
    }
     db1 = database.collection("internetandphones-stats");
});
/*****************API*************/
exports.postRecurso= function(request,response){
    response.sendStatus(405);
    console.log("No se puede hacer un post a un recurso en concreto");

};

exports.getLoadInitial= function(request,response){
    db1.find({}).toArray(function(error, stats1){
        if(error) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
            }else {
                if(stats1.length===0){
                db1.insert([{"country": "austria" , "year": 2010 , "usageinternet": "75.2", "usagephoneline": "40"},
                {"country": "belgium" , "year": 2010 , "usageinternet": "75" , "usagephoneline": "42"},
                {"country": "denmark" , "year": 2010 , "usageinternet": "88.7" , "usagephoneline": "47"}]);
                console.log("OK");
                response.sendStatus(201);
                    
                }else{
                    response.sendStatus(409);
                }
                    
            }
        });
            
        
     };

exports.getCollection=function(request,response){
    console.log("INFO: New resquest to /internetandphones-stats");
    if(!db1){
        console.log("BD is empty");
        response.sendStatus(404);
    }else{
     db1.find({}).toArray(function(error, stats1){
         if (error) {
             console.error('WARNING: Error getting data from DB');
             response.sendStatus(500); // internal server error
        }else {
            if(stats1.length===0){
                console.log("INFO: Sending stats");
                response.sendStatus(404);
            }else{
                response.send(stats1);
            }
        }
     
    });
    }
 
};

exports.getRecursoYearIntentoDosParametros=function(request,response){
var country = request.params.country;
var year = parseInt(request.params.year);
if (!country || !year) {
    console.log("WARNING: New GET request to /export-and-import-stats/:name without name, sending 400...");
    response.sendStatus(400); // bad request
}else {
    console.log("INFO: New GET request to /export-and-import-stats/" + country + year);
    db1.find({"country": country,"year": year}).toArray(function(error, stats1) {
                if (error) {
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }
                else {
                    if (stats1.length > 0) {
                        var c = stats1[0];
                        console.log("INFO: Sending stats: " + JSON.stringify((c), 2, null));
                        response.send(c);
                    }
                    else {
                        console.log("WARNING: There are not any area stats with name " + country);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    };

/*exports.getRecurso=function(request,response){
 var country = request.params.country;
 if(!country){
     console.log("WARMING: There are noy any country");
     response.sendStatus(400);//bad request
 } else if(!db1){ 
     response.sendStatus(404);//Base de datos está vacía
 }else{
    console.log("INFO: New GET");
    db1.find({"country":country}).toArray(function(error,stats1){
        if(error){
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }else{
    
            if(stats1.length>0){
                var c = stats1[0];
                console.log("INFO: Sending country");
                    response.send(c);
                    
                }else{
                    console.log("WARMING: There are not any country with country" + country);
                    response.sendStatus(404);//not found
                }
            }
        });
    }
};*/
/*exports.getRecursoYear=function(request,response){
 var year= parseInt(request.params.year);
 console.log("Qué llega"+year);
 if(!year){
     console.log("WARMING: There are noy any year");
     response.sendStatus(400);//bad request
 } else if(!db1){ 
     response.sendStatus(404);//Base de datos está vacía
 }else{
    console.log("INFO: New GET");
    db1.find({"year":year}).toArray(function(error,stats1){
        if(error){
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }else{
            
            if(stats1.length>0){
                var c = stats1[0];
                console.log("INFO: Sending year");
                    response.send(c);
                    
                }else{
                    console.log("WARMING: There are not any year with" + year);
                    response.sendStatus(404);//not found
                }
            }
        });
    }
};*/

/*exports.getRecursoYearIntentoDosParametros=function(request,response){
 var year= parseInt(request.params.year);
 var country= request.params.country;
 console.log("Qué llega"+ year +country);
 if(!year || !country){
     console.log("WARMING: There are noy any year");
     response.sendStatus(400);//bad request
 }else if(!country){
    console.log("INFO: New GET");
    db1.find({"year":year}).toArray(function(error,stats1){
        if(error){
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }else{
            
            if(stats1.length>0){
                var c = stats1[0];
                console.log("INFO: Sending year");
                    response.send(c);
                    
                }else{
                    console.log("WARMING: There are not any year with" + year);
                    response.sendStatus(404);//not found
                }
            }
        });
}else if(!year){
    db1.find({"country":country}).toArray(function(error,stats2){
        if(error){
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }else{
            
            if(stats2.length>0){
                var c2 = stats2[0];
                console.log("INFO: Sending country");
                    response.send(c2);
                    
                }else{
                    console.log("WARMING: There are not any country with" + country);
                    response.sendStatus(404);//not found
                }
            }
        });
    }

};*/

exports.postCollection=function(request,response){
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
            db1.find({}).toArray(function(error,stats1){
                if(error){
                    console.error('WARNING: Error getting data from DB');
                    response.sendStatus(500); // internal server error
                }else{
                     var internetandphonesBeforeInsertion=  stats1.filter((i)=>{
                        return (i.country.localCompare(country,"en",{"sensitiviry":"base"})===0);
                     });
                    if(internetandphonesBeforeInsertion.length>0){
                        console.log("WARMING: This data already exists");
                        response.sendStatus(409);
                    }else{
                        console.log("INFO: adding Internetandphones");
                        db1.insert(newInternetandphones);
                        response.sendStatus(201);
                    }
                }
            });
        }
    }
    
};

exports.putRecurso=function(request,response){
 var updateStat= request.body;
    if (!updateStat) {
        console.log("WARNING: New PUT");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New PUT");
        if(!updateStat.country || !updateStat.year || !updateStat.usageinternet  || !updateStat.usagephoneline){
            console.log("WARMING: New PUT incorrect");
            response.sendStatus(422);//incorrecto
        } else {
            db1.update({country:updateStat.country},
            {
                country:updateStat.country, 
                year:updateStat.year,
                usageinternet: updateStat.usageinternet,
                usagephoneline: updateStat.usagephoneline
                
            });
        
        }
    }
};

exports.putCollection=function(request,response){
    response.sendStatus(405);
};

exports.deleteCollection=function(request,response) {
   console.log("INFO: New DELETE");
    db1.remove({}, {multi: true}, function (error, stats1) {
        if (error) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
             if (stats1.length >0) {
                    console.log("INFO: The stats is removed");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no stats to delete");
                    response.sendStatus(404); // not found
                }
        }
    });
};

exports.deleteRecurso=function(request,response){
    var country = request.params.country;
    if (!country) {
        console.log("WARNING: New DELETE");
        response.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE");
        db1.remove({country: country}, {}, function (error, stats1) {
            if (error) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Stats remove");
                if ( stats1 === 1) {
                    console.log("INFO: The stats is removed");
                    response.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no stats to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
};
    


