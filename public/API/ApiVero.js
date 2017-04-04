var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://kkdekiki:232323@ds137360.mlab.com:37360/internetandphones-stats';

var db1;
var exports = module.exports = {};


mongoClient.connect(url, {
    native_parser: true
}, (error, database) => {

    if (error) {
        console.log("No podemos usar la base de datos" + error);
        process.exit();
    }
    db1 = database.collection("internetandphones-stats");
});
/*****************API*************/
exports.postRecurso = function(request, response) {
    response.sendStatus(405);
    console.log("No se puede hacer un post a un recurso en concreto");

};

exports.getLoadInitial = function(request, response) {
    db1.find({}).toArray(function(error, stats1) {
        if (error) {
            console.error('WARNING: Error getting data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            if (stats1.length === 0) {
                db1.insert([{
                    "country": "austria",
                    "year": 2010,
                    "usageinternet": "75.2",
                    "usagephoneline": "40"
                }, {
                    "country": "belgium",
                    "year": 2010,
                    "usageinternet": "75",
                    "usagephoneline": "42"
                }, {
                    "country": "denmark",
                    "year": 2010,
                    "usageinternet": "88.7",
                    "usagephoneline": "47"
                }]);
                console.log("OK");
                response.sendStatus(201);

            }
            else {
                response.sendStatus(409);
            }
        }
    });
};

exports.getCollection = function(request, response) {
    console.log("INFO: New resquest to /internetandphones-stats");
    if (!db1) {
        console.log("BD is empty");
        response.sendStatus(404);
    }
    else {
        db1.find({}).toArray(function(error, stats1) {
            if (error) {
                console.error('WARNING: Error getting data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                if (stats1.length === 0) {
                    console.log("INFO: Sending stats");
                    response.sendStatus(404);
                }
                else {
                    response.send(stats1);
                }
            }

        });
    }

};

exports.getRecurso = function(request, response) {
    var country = request.params.country;
    var a = [];
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
                    response.send(a);
                }
            }
        });
    }
};

exports.getRecursoDosParametros = function(request, response) {
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
};


exports.postCollection = function(request, response) {
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
                        return (i.country.localeCompare(country, "en", {
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

};

exports.putRecurso = function(request, response) {
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
};

exports.putRecursoDosParametros = function(request, response) {
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
            console.log("WARNING: The stat " + JSON.stringify(updateStat, 2, null) + " is not well-formed, sending 422...");
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
                        db1.update({country: countryPar, year: yearPar}, updateStat);
                        console.log("INFO: Modifying data with country " + countryPar + " with data " + JSON.stringify(updateStat, 2, null));
                        response.send(updateStat); // return the updated contact
                    }
                    else {
                        console.log("WARNING: There are not any data with country " + countryPar);
                        response.sendStatus(404); // not found
                    }
                }
            });
        }
    }
};


exports.putCollection = function(request, response) {
    response.sendStatus(405);
};

exports.deleteCollection = function(request, response) {
    console.log("INFO: New DELETE");
    db1.remove({}, {
        multi: true
    }, function(error, stats1) {
        if (error) {
            console.error('WARNING: Error removing data from DB');
            response.sendStatus(500); // internal server error
        }
        else {
            if (stats1.length > 0) {
                console.log("INFO: The stats is removed");
                response.sendStatus(204); // no content
            }
            else {
                console.log("WARNING: There are no stats to delete");
                response.sendStatus(404); // not found
            }
        }
    });
};

exports.deleteRecurso = function(request, response) {
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
                console.log("INFO: Stats remove");
                if (stats1 === 1) {
                    console.log("INFO: The stats is removed");
                    response.sendStatus(204); // no content
                }
                else {
                    console.log("WARNING: There are no stats to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
};
exports.deleteRecursoDosParametros = function(request, response) {
    var country = request.params.country;
    var year = parseInt(request.params.year);
    if (!country && !year) {
        console.log("WARNING: New DELETE request");
        response.sendStatus(400);
    }
    else {
        console.log("INFO: New DELETE" + country);
        db1.remove({
            country: country,
            year: year
        }, {}, function(error, stats1) {
            var a = JSON.parse(stats1);
            if (error) {
                console.error('WARNING: Error removing data from DB');
                response.sendStatus(500); // internal server error
            }
            else {
                console.log("INFO: stat removed: " + a.n);
                if (a.n === 1) {
                    console.log("INFO: The stat with country " + country + " has been succesfully deleted");
                    response.sendStatus(204); // no content
                }
                else {
                    console.log("WARNING: There are not anything to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }

};
