var mongoClient = require ('mongodb').MongoClient;

var url = 'mongodb://kkdekiki:232323@ds137360.mlab.com:37360/internetandphones-stats';

var db1;
var exports= module.exports={};


/*****************API*************/
exports.getLoadInitial= function(requiere,response){
    mongoClient.connect(url,{native_parser:true},(error,database)=>{
        if(error){
            console.log("can't use db");
            process.exit();
        }
         db1=database.collection("internetandphones-stats");
        db1.find({}).toArray(function(error, stats1){
      if (error) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if(stats1.length==0){
                db1.insert([{"country": "austria" , "year": "2010" , "usageinternet": "75.2", "usagephoneline": "40"},
                    {"country": "belgium" , "year": "2010" , "usageinternet": "75" , "usagephoneline": "42"},
                    {"country": "denmark" , "year": "2010" , "usageinternet": "88.7" , "usagephoneline": "47"}]);
                console.log("OK");
               response.sendStatus(201);
            }else{
                response.sendStatus(409);
            }
        
        }
      });
    });
};

exports.postRecurso= function(requiere,response){
    response.sendStatus(405);
    console.log("No se puede hacer un post a un recurso en concreto");

};

exports.getCollection=function(require,response){
 console.log("INFO: New resquest to /internetandphones-stats");
    db1.find({}).toArray(function(error, stats1){
      if (error) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        } else {
            console.log("INFO: Sending stats");
            response.send(stats1);
        }
    });
};

exports.getRecurso=function(require,response){
 var country = require.params.country;
    if(!country){
        console.log("WARMING: There are noy any country");
        response.sendStatus(400);//bad request
    }else{
        console.log("INFO: New GET");
        db1.find({country:country}).toArray(function(error,stats1){
            if(error){
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }else{
                var filteredCountry = stats1.filter((s)=>{
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
    }
};

exports.postCollection=function(require,response){
 var country = require.params.country;
    var newInternetandphones= require.body;
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
                        return (i.country.localeCompare(country,"en",{"sensitiviry":"base"})===0);
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

exports.putRecurso=function(require,response){
 var updateStat= require.body;
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

exports.putCollection=function(require,response){
    response.sendStatus(405);
};

exports.deleteCollection=function(require,response) {
   console.log("INFO: New DELETE");
    db1.remove({}, {multi: true}, function (error, stats1) {
        if (error) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        } else {
            if (stats1 > 0) {
                console.log("INFO: All stats are removed");
                response.sendStatus(204); // no content
            } else {
                console.log("WARNING: There are no stats to delete");
                response.sendStatus(404); // not found
            }
        }
    });
};

exports.deleteRecurso=function(require,resonse){
    var country = require.params.country;
    if (!country) {
        console.log("WARNING: New DELETE");
        require.sendStatus(400); // bad request
    } else {
        console.log("INFO: New DELETE");
        db1.remove({country: country}, {}, function (error, stats1) {
            if (error) {
                console.error('WARNING: Error removing data from DB');
                require.sendStatus(500); // internal server error
            } else {
                console.log("INFO: Stats remove");
                if ( stats1 === 1) {
                    console.log("INFO: The stats is removed");
                    require.sendStatus(204); // no content
                } else {
                    console.log("WARNING: There are no stats to delete");
                    require.sendStatus(404); // not found
                }
            }
        });
    }
};
    



