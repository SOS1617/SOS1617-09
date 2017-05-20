var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://kkdekiki:232323@ds137360.mlab.com:37360/internetandphones-stats';

var db1;
var exports = module.exports = {};
var apikey="internetstats";



mongoClient.connect(url, {
    native_parser: true
}, (error, database) => {

    if (error) {
        console.log("No podemos usar la base de datos" + error);
        process.exit();
    }
    db1 = database.collection("internetandphones-stats");
});

var check = function(f) {
    var res = false;
    if (f === apikey) {
        res = true;
    }
    return res;
};
/*****************API*************/

exports.postRecurso = function(request, response) {
    var key = request.query.apikey;
    if(!key){
        response.sendStatus(401);
    }else if (!check(key)){
        
        response.sendStatus(403);
    }else{
        response.sendStatus(405);
        console.log("No se puede hacer un post a un recurso en concreto");
    }
};

exports.getLoadInitial = function(request, response) {
    var key = request.query.apikey;
    if(!key){
        response.sendStatus(401);
    }else if(!check(key)){
        response.sendStatus(403);
    }else{
        db1.find({}).toArray(function(error, stats1) {
            if (error) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }else {
                if (stats1.length === 0) {
                    db1.insert([{
                    "country": "austria",
                    "year": 2010,
                    "usageinternet": 75.2,
                    "usagephoneline": 40
                }, {
                    "country": "belgium",
                    "year": 2010,
                    "usageinternet": 75,
                    "usagephoneline": 42
                }, {
                    "country": "denmark",
                    "year": 2010,
                    "usageinternet": 88.7,
                    "usagephoneline": 47
                }, {
                    "country": "estonia",
                    "year": 2010,
                    "usageinternet": 74.1,
                    "usagephoneline": 30
                }, {
                    "country": "finland",
                    "year": 2010,
                    "usageinternet": 86.9,
                    "usagephoneline": 23
                }, {
                    "country": "france",
                    "year": 2010,
                    "usageinternet": 77.3,
                    "usagephoneline": 64
                }, {
                    "country": "germany",
                    "year": 2010,
                    "usageinternet": 82,
                    "usagephoneline": 64
                }, {
                    "country": "greece",
                    "year": 2010,
                    "usageinternet": 44.4,
                    "usagephoneline": 23
                }, {
                    "country": "hungary",
                    "year": 2010,
                    "usageinternet": 65,
                    "usagephoneline": 30
                }, {
                    "country": "iceland",
                    "year": 2010,
                    "usageinternet": 93.4,
                    "usagephoneline": 61
                }, {
                    "country": "italy",
                    "year": 2010,
                    "usageinternet": 53.7,
                    "usagephoneline": 37
                }, {
                    "country": "norway",
                    "year": 2010,
                    "usageinternet": 93.4,
                    "usagephoneline": 34
                }, {
                    "country": "portugal",
                    "year": 2010,
                    "usageinternet": 53.3,
                    "usagephoneline": 42
                }, {
                    "country": "spain",
                    "year": 2010,
                    "usageinternet": 65.8,
                    "usagephoneline": 44
                }, {
                    "country": "sweden",
                    "year": 2010,
                    "usageinternet": 90,
                    "usagephoneline": 50
        
                
                }]);
                console.log("OK");
                response.sendStatus(201);

            }else {
                response.sendStatus(409);
            }
        
        }
    });
    }
    
};

exports.getCollection = function(request, response) { //paginación limit offset-> ?limit=x&offset=y
    var key = request.query.apikey;
    if(!key){
        response.sendStatus(401);
    }else if (!check(key)){
        response.sendStatus(403);
    }else{
        
        var limit = parseInt(request.query.limit);
        var offset = parseInt(request.query.offset);
        console.log("INFO: New resquest to /internetandphones-stats");
        if (!db1) {
            console.log("BD is empty");
            response.sendStatus(404);
        }
        else {
            db1.find({}).skip(offset).limit(limit).toArray(function(error, stats1) {
            if (error) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (stats1.length === 0) {
                    console.log("INFO: Sending stats");
                    response.sendStatus(404);
                }else {
                    response.send(stats1);
                }
            }

            });
        }
    }

};


exports.getRecurso = function(request, response) { //Búsqueda en un recurso from to -> ?from=x&to=y
     var key = request.query.apikey;
     if (!key) {
         response.sendStatus(401);
     }
     else if (!check(key)) {
         response.sendStatus(403);
     }
     else {
         var from = parseInt(request.query.from);
         var to = parseInt(request.query.to);
         var country = request.params.country;
         var a = [];
         var res = [];
         if (!country) {
             console.log("BAD Request");
             response.sendStatus(400);
         }
         else if (!db1) {
             response.sendStatus(404);
         }
         else {
             db1.find({}).toArray(function(error, stats1) {
                 if (stats1.length === 0) {
                     console.log("WARNING: Error getting data from DB");
                     response.sendStatus(404);
                 }
                 else {
                     if (country) {
                         for (var i = 0; i < stats1.length; i++) {
                             if (stats1[i].country === country) {
                                 a.push(stats1[i]);

                             }
                             else if (stats1[i].year === parseInt(country)) {
                                 a.push(stats1[i]);

                             }

                         }
                         if (from && to) {
                             for (var i = 0; i < a.length; i++) {
                                 if (from === a[i].year || (from <= a[i].year && to >= a[i].year)) {
                                     res.push(a[i]);

                                 }
                             }
                            // response.send(res);
                             response.sendStatus(200);

                         }
                         else if (a.length === 0) {
                             response.sendStatus(404);
                         }
                         else {
                             response.send(a);
                         }
                     }
                 }

             });
         }
     }
};
exports.getRecursoDosParametros = function(request, response) {
     var key = request.query.apikey;
     if (!key) {
         response.sendStatus(401);
     }
     else if (!check(key)) {
         response.sendStatus(403);
     }
     else {
         var country = request.params.country;
         var year = parseInt(request.params.year);
         var a = [];
         if (!country) {
             console.log("Bad Request");
             response.sendStatus(400);

         }
         else if (!db1) {
             response.sendStatus(404);
         }
         else {
             db1.find({}).toArray(function(error, stats1) {
                 if (stats1.length === 0) {
                     console.log("WARNING: Error getting data from DB");
                     response.sendStatus(404);
                 }
                 else {
                     if (country) {
                         for (var i = 0; i < stats1.length; i++) {
                             if (stats1[i].country === country) {
                                 a.push(stats1[i]);
                             }
                         }
                         var b = a.filter(f => f.year === year);
                         response.send(b);
                     }
                 }
             });
         }

     }   
};
     
exports.postCollection = function(request, response) {
     var key = request.query.apikey;
     if (!key) {
         response.sendStatus(401);
     }
     else if (!check(key)) {
         response.sendStatus(403);
     }
     else {
         var country = request.params.country;
         var newInternetandphones = request.body;
         if (!newInternetandphones) {
             console.log("WARMING: New POST without Internetandphones");
             response.sendStatus(400); //bad request
         }
         else {
             console.log("INFO: New PORT with correct body");
             if (!newInternetandphones.country || !newInternetandphones.year || !newInternetandphones.usageinternet || !newInternetandphones.usagephoneline) {
                 console.log("WARMING: New POST incorrect");
                   console.log(newInternetandphones);
                 response.sendStatus(422); //incorrecto
             }
             else {
                 db1.find({}).toArray(function(error, stats1) {
                     if (error) {
                         console.error('WARNING: Error getting data from DB');
                         response.sendStatus(500); // internal server error
                     }
                     else {
                         var internetandphonesBeforeInsertion = stats1.filter((i) => {
                             return (i.country.localeCompare(newInternetandphones.country, "en", {
                                 "sensitiviry": "base"
                             }) === 0);
                         });
                         if (internetandphonesBeforeInsertion.length > 0) {
                             console.log("WARMING: This data already exists");
                             response.sendStatus(409);
                         }
                         else {
                             console.log("INFO: adding Internetandphones");
                             db1.insert(newInternetandphones);
                             response.sendStatus(201);
                         }
                     }
                 });
             }
         }
     }
};



exports.putRecurso = function(request, response) {
     var key = request.query.apikey;
     if (!key) {
         response.sendStatus(401);
     }
     else if (!check(key)) {
         response.sendStatus(403);
     }
     else {
         var updateStat = request.body;
         if (!updateStat) {
             console.log("WARNING: New PUT");
             response.sendStatus(400); // bad request
         }
         else {
             console.log("INFO: New PUT");
             if (!updateStat.country || !updateStat.year || !updateStat.usageinternet || !updateStat.usagephoneline) {
                 console.log("WARMING: New PUT incorrect");
                 response.sendStatus(422); //incorrecto
             }
             else {
                 db1.update({
                     country: updateStat.country
                 }, {
                     country: updateStat.country,
                     year: updateStat.year,
                     usageinternet: updateStat.usageinternet,
                     usagephoneline: updateStat.usagephoneline

                 });
                 response.sendStatus(200);

             }
         }
     }
};

exports.putRecursoDosParametros = function(request, response) {
     var key = request.query.apikey;
     if (!key) {
         response.sendStatus(401);
     }
     else if (!check(key)) {
         response.sendStatus(403);
     }
     else {
         var updateStat = request.body;
         var countryPar = request.params.country;
         var yearPar = parseInt(request.params.year);
         if (!updateStat) {
             console.log("WARNING: New PUT");
             response.sendStatus(400); // bad request

         }
         else {
             console.log("INFO: New PUT request to stat" + countryPar + " and year " + yearPar + " with data " + JSON.stringify(updateStat, 2, null));
             if (!updateStat.country || !updateStat.year || !updateStat.usageinternet || !updateStat.usagephoneline) {
                 console.log("WARNING: The stat " + JSON.stringify(updateStat, 2, null));
                 response.sendStatus(422); // unprocessable entity
             }
             else {
                 db1.find({}, function(err, stats1) {
                     if (err) {
                         console.error('WARNING: Error getting data from DB');
                         response.sendStatus(500); // internal server error
                     }
                     else {
                         console.log(stats1);
                         if (countryPar === updateStat.country && yearPar === parseInt(updateStat.year)) {
                             db1.update({
                                 country: countryPar,
                                 year: yearPar
                             }, updateStat);
                             console.log("INFO: Modifying data with country " + countryPar + " with data " + JSON.stringify(updateStat, 2, null));
                             response.send(updateStat); // return the updated contact
                         }
                         else {
                             console.log("WARNING: There are not any data with country " + countryPar);
                             response.sendStatus(400); // not found
                         }
                     }
                 });
             }
         }
    }
};


exports.putCollection = function(request, response) {
    var key = request.query.apikey;
    if(!key){
        response.sendStatus(401);
    }else if(!check(key)){
        response.sendStatus(403);
    }else{
    response.sendStatus(405);
    }
};

exports.deleteCollection = function(request, response) {
     var key = request.query.apikey;
     if (!key) {
         response.sendStatus(401);
     }
     else if (!check(key)) {
         response.sendStatus(403);
     }
     else {
         console.log("INFO: New DELETE");
         db1.remove({}, {
             multi: true
         }, function(error, stats1) {
             if (error) {
                 console.error('WARNING: Error removing data from DB');
                 response.sendStatus(500); // internal server error
             }
             else {
                 console.log("cleaned");
                 response.sendStatus(204);
                 
                 if (stats1.length === 0) {
                     console.log("Empty");
                     var v =[];
                     response.send(v);
                     response.sendStatus(404);
                     
                     return;
                 }
             }
         });
     }
};


     
exports.deleteRecurso = function(request, response) {
         var key = request.query.apikey;
         if (!key) {
             response.sendStatus(401);
         }
         else if (!check(key)) {
             response.sendStatus(403);
         }
         else {

             var country = request.params.country;
             if (!country) {
                 console.log("WARNING: New DELETE");
                 response.sendStatus(400); // bad request
             }
             else {
                 console.log("INFO: New DELETE");
                 db1.remove({
                     country: country
                 }, {}, function(error, stats1) {
                     if (error) {
                         console.error('WARNING: Error removing data from DB');
                         response.sendStatus(500); // internal server error
                     } 
                     else {
                         console.log("INFO: The country" + country +"has been succesfully deleted");
                         response.sendStatus(204); 
                         
                     }
                 });
             }
         }
        
     
};

exports.deleteRecursoDosParametros = function(request, response) {
    var key = request.query.apikey;
    if (!key) {
        response.sendStatus(401);
    }
    else if (!check(key)) {
        response.sendStatus(403);
    }
    else {
        var country = request.params.country;
        var year = parseInt(request.params.year);
        if (!country || !year) {
            console.log("WARNING: New DELETE request");
            response.sendStatus(400);
        }
        else {
            db1.find({}).toArray(function(error, stats) {

                if (stats.length === 0) {
                    console.log("Something is wrong");
                    response.sendStatus(404);
                }else {

                    var a = stats.filter(c => c.year == year && c.country === country);
                    db1.remove({country:country,year: parseInt(year)}, {}, function(error, stats1) {
                        console.log(a);
                        if (error) {
                            console.log("Something wrong on DataBase");
                            response.sendStatus(500);
                        }else{
                            console.log("INFO: The stat with country " + country + " has been succesfully deleted");
                            response.sendStatus(204); // no content
                        }
                    });
                }
                
            });
        }
    }
};


function getKey(){
    return apikey;
}

function setKey(key){
    apikey = key;
}
