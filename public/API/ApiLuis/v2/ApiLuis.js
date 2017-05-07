var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://lpontegc:test@ds137340.mlab.com:37340/sos-lpontegc";

var exports = module.exports = {};

var db;

mongoClient.connect(mongoURL, {
    native_parser: true
}, (error, database) => {

    if (error) {
        console.log("It is impossible to use DataBase " + error);
        process.exit();
    }
    db = database.collection("ticsathome-stats");
});


var apikey = "ticsathomeLuis";
/**************************LOAD INITIAL DATA ****************/


exports.getNewStats = function(req, res) {
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
        db.find({}).toArray(function(err, data) {

            if (!err) {

                if (data.length === 0 && db) {

                    db.insert([{
                        "country": "germany",
                        "year": 2016,
                        "smartphone": 30,
                        "tablet": 18
                    }, {
                        "country": "belgium",
                        "year": 2016,
                        "smartphone": 23,
                        "tablet": 16
                    }, {
                        "country": "spain",
                        "year": 2016,
                        "smartphone": 40,
                        "tablet": 24
                    }, {
                        "country": "france",
                        "year": 2016,
                        "smartphone": 22,
                        "tablet": 17
                    }, {
                        "country": "italy",
                        "year": 2016,
                        "smartphone": 39,
                        "tablet": 28
                    }, {
                        "country": "portugal",
                        "year": 2016,
                        "smartphone": 27,
                        "tablet": 15
                    }, {
                        "country": "united kingdom",
                        "year": 2016,
                        "smartphone": 30,
                        "tablet": 20
                    }, {
                        "country": "hungry",
                        "year": 2016,
                        "smartphone": 26,
                        "tablet": 16
                    }, {
                        "country": "poland",
                        "year": 2016,
                        "smartphone": 37,
                        "tablet": 19
                    }, {
                        "country": "slovakia",
                        "year": 2016,
                        "smartphone": 31,
                        "tablet": 22
                    }]);

                    console.log("OK");
                    res.sendStatus(201);
                }
                else {
                    console.log("DataBase is not empty");
                    res.sendStatus(409);
                }

            }







        });
    }
};


/**********************GET********************/

//Get conjunto datos


// GET a coleccion
exports.getGeneral = function(req, res) {


 

    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);

        console.log("INFO: New GET request to /ticsathome-stats");
        if (!db) {
            console.log("DataBase empty, sorry");
            
            res.sendStatus(404);
           
        }

        else {
            /***PAGINACION***/
            db.find({}).skip(offset).limit(limit).toArray(function(err, data) {
                if (err) {
                    console.error('ERROR coming from DataBase');
                    res.sendStatus(500); // internal server error
                }
                else {
                    if (data.length === 0) {
                        console.log("Nothing in Database, please introduce data");
                        res.sendStatus(404);
                    }
                    else {
                        console.log("INFO: Sending stats: " + JSON.stringify(data, 2, null));
                        res.send(data);
                    }
                }
            });

        }
    }
};


//GET a un recurso en concreto 

exports.getOneParam = function(req, res) {

   
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
         var from = parseInt(req.query.from);
    var to = parseInt(req.query.to);



    var paramCountry = req.params.country;
    var arr = [];
    var filt = [];
        if (!paramCountry) {
            console.log("Specific request does not exists,try again");
            res.sendStatus(400); // bad request

        }
        else if (!db) {
            res.sendStatus(404);
        }
        else {
            db.find({}).toArray(function(error, datos) {

                if (datos.length === 0) {
                    console.log("Something is wrong");
                    res.sendStatus(404);
                }
                else {

                    for (var i = 0; i < datos.length; i++) {

                        if (datos[i].country === paramCountry) {
                            arr.push(datos[i]);

                        }
                        else if (datos[i].year === parseInt(paramCountry)) {
                            arr.push(datos[i]);

                        }

                    }
                    /******BUSQUEDA******/

                    if (from && to) {


                        for (var i = 0; i < arr.length; i++) {
                            if (from === arr[i].year || (from <= arr[i].year && to >= arr[i].year)) {
                                filt.push(arr[i]);


                            }
                        }
                        //res.send(filt);
                        res.sendStatus(200);

                        /*****************/
                    }
                    else if (arr.length === 0) {
                        res.sendStatus(404);
                    }
                    else {
                        //res.sendStatus(200);
                        res.send(arr);
                    }
                }

            });



        }
    }
};

/*************************************GET 2 PARAM***************************/

exports.getTwoSpecific = function(req, res) {

   
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
         var paramCountry = req.params.country;
    var paramYear = req.params.year;
    var arr = [];
        if (!paramYear || !paramCountry) {
            console.log("Specific request does not exists,try again");
            res.sendStatus(400); // bad request

        }
        else {
            db.find({}).toArray(function(error, stats) {

                if (stats.length === 0) {
                    console.log("Something is wrong");
                    res.sendStatus(404);
                }
                else {

                    for (var i = 0; i < stats.length; i++) {

                        if (stats[i].country === paramCountry /*&& stats[i].year ===paramYear*/ ) {
                            arr.push(stats[i]);
                        }
                    }
                    var aux = arr.filter(c => c.year == paramYear);

                    console.log(aux);

                    res.send(aux);
                }

            });



        }
    }
};




/**********************POST********************/

//POST a un conjunto 

exports.postGeneral = function(req, res) {

   

    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
 var newGeneral = req.body;
        if (!newGeneral) {
            console.log("WARNING: New POST request to /ticsathome-stats/ without content, sending 400...");
            res.sendStatus(400); //BAD REQUEST

        }
        else if (!newGeneral.country || !newGeneral.year || !newGeneral.smartphone || !newGeneral.tablet) {

            res.sendStatus(400);
            console.log("Some data is missing, check your inserts");


        }
        else {
            db.find({}).toArray(function(error, stat) {

                if (stat.length === 0) {
                    console.log("Something is wrong");
                    res.sendStatus(404);
                }
                else {
                    db.find({}).toArray(function(err, stats) {
                        if (err) {
                            console.error('WARNING: Error getting data from DB');
                            res.sendStatus(500); // internal server error
                        }
                        else {
                            
                            
                            var statsBeforeInsertion = stats.filter((contact) => { 
                                console.log(contact.country);
                                 console.log(newGeneral.country);
                                return (contact.country.localeCompare(newGeneral.country, "en", {
                                    'sensitivity': 'base'
                                }) === 0);
                                
                            });

                            if (statsBeforeInsertion.length > 0) {
                                console.log("WARNING: The contact " + JSON.stringify(newGeneral, 2, null) + " already extis, sending 409...");
                                res.sendStatus(409); // conflict
                            }
                            else {
                                console.log("INFO: Adding contact " + JSON.stringify(newGeneral, 2, null));
                                db.insert(newGeneral);
                                res.sendStatus(201); // created
                            }
                        }
                    });
                }

            });



        }
    }

};


//POST a un recurso en concreto 


exports.errorInPost = function(req, res) {
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {

        res.sendStatus(405); //Method Not Allowed

        console.log("No se puede hacer un post a un recurso en concreto");
    }
};


/**********************PUT************************/


//PUT a una coleccion de datos

exports.errorInPut = function(req, res) {
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
        console.log("WARNING: New PUT request to /contacts, sending 405...");
        res.sendStatus(405); // method not allowed
    }
};



//PUT a un recurso en concreto

exports.putSpecific = function(req, res) {
 
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
           var updatedSpecific = req.body;
    var paramCountry = req.params.country;
        if (!updatedSpecific) {
            console.log("WARNING: New PUT request to /contacts/ without contact, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New PUT request to /contacts/" + paramCountry + " with data " + JSON.stringify(updatedSpecific, 2, null));
            if (!updatedSpecific.country || !updatedSpecific.year || !updatedSpecific.smartphone || !updatedSpecific.tablet) {
                console.log("WARNING: The specific data " + JSON.stringify(updatedSpecific, 2, null) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            }
            else {
                db.find({}, function(err, stats) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }
                    else {

                        if (paramCountry === updatedSpecific.country) {
                            db.update({
                                country: paramCountry,
                            }, updatedSpecific);
                            console.log("INFO: Modifying data with country " + paramCountry + " with data " + JSON.stringify(updatedSpecific, 2, null));
                            res.send(updatedSpecific); // return the updated contact
                        }
                        else {
                            console.log("WARNING: There are not any data with country " + paramCountry);
                            res.sendStatus(400); // not found
                        }
                    }
                });
            }
        }
    }
};


exports.putTwoSpecific = function(req, res) {
  
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
          var updatedSpecific = req.body;
    var paramCountry = req.params.country;
    var paramYear = parseInt(req.params.year);
        if (!updatedSpecific) {
            console.log("WARNING: New PUT request to /contacts/ without contact, sending 400...");
            res.sendStatus(400); // bad request
        }
        else {
            console.log("INFO: New PUT request to /contacts/" + paramCountry + " with data " + JSON.stringify(updatedSpecific, 2, null));

            if (!updatedSpecific.country || !updatedSpecific.year || !updatedSpecific.smartphone || !updatedSpecific.tablet) {
                console.log("WARNING: The specific data " + JSON.stringify(updatedSpecific, 2, null) + " is not well-formed, sending 422...");
                res.sendStatus(422); // unprocessable entity
            }
            else {
                db.find({}, function(err, stats) {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }
                    else {

                        if (paramCountry === updatedSpecific.country && paramYear === parseInt(updatedSpecific.year)) {
                            db.update({
                                country: paramCountry,
                                year: paramYear
                            }, updatedSpecific);
                            console.log("INFO: Modifying data with country " + paramCountry + " with data " + JSON.stringify(updatedSpecific, 2, null));
                            res.send(updatedSpecific); // return the updated contact
                        }
                        else {
                            console.log("WARNING: There are not any data with country " + paramCountry);
                            res.sendStatus(404); // not found
                        }
                    }
                });
            }
        }
    }
};



/*********************DELETE********************/


//DELETE a una colección de datos


exports.deleteStats = function(req, res) {
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
        db.remove({}, {
            multi: true
        }, function(err, borr) {


            if (err) {
                console.error('Error on Delete function');
                res.sendStatus(500); // internal server error
            }
            else {


                console.log("All clear");
                res.sendStatus(204); // no content

                if (borr.length === 0) {
                    console.log("Nothing to lose");
                var z = [];
                     res.send(z);
                    res.sendStatus(404); // not found
                    
                   
                    return;
                }
            }
        });
    }

};

//DELETE a un recurso en concreto



exports.deleteOne = function(req, res) {

  
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
          var paramCountry = req.params.country;

        if (!paramCountry) {
            res.sendStatus(400);

        }
        else {
            db.remove({
                country: paramCountry
            }, {}, function(error, Sremove) {

                if (error) {
                    console.log("Something wrong on DataBase");
                    res.sendStatus(500);
                }
                else {


                    console.log("INFO: The country with name " + paramCountry + " has been succesfully deleted, sending 204...");
                    res.sendStatus(204); // no content

                }

            });

        }

    }
};

exports.deleteTwo = function(req, res) {

   
    var paramKey = req.query.apikey;
    if (!paramKey) {
        res.sendStatus(401);
    }
    else if (!checkKey(paramKey)) {
        res.sendStatus(403); //Hay key pero no es correcta
    }
    else {
 var paramCountry = req.params.country;
    var paramYear = parseInt(req.params.year);
        if (!paramCountry || !paramYear) {
            res.sendStatus(400);

        }
        else {
            db.find({}).toArray(function(error, stats) {

                if (stats.length === 0) {
                    console.log("Something is wrong");
                    res.sendStatus(404);
                }
                else {

                    var aux = stats.filter(c => c.year == paramYear && c.country === paramCountry);
                    db.remove({
                        country: paramCountry,
                        year: parseInt(paramYear)
                    }, {}, function(error, Sremove) {
                        console.log(aux);

                        if (error) {
                            console.log("Something wrong on DataBase");
                            res.sendStatus(500);
                        }
                        else {


                            console.log("INFO: The country with name " + paramCountry + " has been succesfully deleted, sending 204...");
                            res.sendStatus(204); // no content

                        }

                    });

                }
            });




        }
    }
};

/****************************************************/

function checkKey(paramKey) {
    if (paramKey === apikey) {
        return true;
    }
    else {
        return false;
    }
}

function getKey(){
    
    return apikey;
}
function setKey(key){
    apikey = key;
    
}
