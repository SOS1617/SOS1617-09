var mongoClient = require("mongodb").MongoClient;

var mongoURL = "mongodb://manu:admin@ds137730.mlab.com:37730/sos1617";

var db;

var apikey = "manuel";

/*Si se intenta acceder a la API con…
sin apikey se debe devolver el código 401.
con una apikey inválida se debe devolver el código 403.
*/
 
/************************CONECTAR CON LA BASE DE DATOS**************/

mongoClient.connect(mongoURL, {native_parser: true}, (error, database) => {

    if (error) {
        console.log("No podemos usar la base de datos" + error);
    }

    db = database.collection("hiv-stats");

});

/**************************LOAD INITIAL DATA ****************/

module.exports.getCreateStats = (req, res) => {
    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {

        if (db) {

            db.find({}).toArray(function(error, conjunto) {
                if (error) {
                    console.error(' Error from DB');
                    res.sendStatus(500); // internal server error
                }
                else {

                    if (conjunto.length !== 0) { //Si mi base de datos no está  vacía
                        res.sendStatus(409); //Conflicto,la base de datos ya estaba inicializada

                    }
                    else {
                        meteDatos(db);
                        console.log("OK");
                        res.sendStatus(201);

                    }

                }

            });
        }
        else {
            console.log("No se ha inicialiazado la base de datos correctamente");
            res.send(500);

        }
    }
};


/**********************GET********************/

//Get conjunto datos

module.exports.getObtainStats = (req, res) => {

    var key = req.query.apikey;
    var aux = [];

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {


        console.log("INFO: New GET request to /hiv-stats");
        if (!db || db.length === 0) {
            console.log("No hay nada en la base de datos");
            res.sendStatus(404);
        }

        else {
            var limit = parseInt(req.query.limit);
            var offset = parseInt(req.query.offset);
            var from = req.query.from;
            var to = req.query.to;


            if (limit && offset) {

                db.find({}).skip(offset).limit(limit).toArray(function(err, data) {
                    if (err) {
                        console.error('ERROR from database');
                        res.sendStatus(500); // internal server error
                    }
                    else {
                        if (data.length === 0) {
                            res.sendStatus(404);
                        }
                        console.log("INFO: Sending contacts: " + JSON.stringify(data, 2, null));
                        if (from && to) {

                            aux = buscameDatos(data, aux, from, to);
                            if (aux.length > 0) {
                                res.send(aux);
                            }
                            else {
                                res.sendStatus(404); //Está el from y el to pero está mal hecho
                            }
                        }
                        else {
                            res.send(data);
                        }
                    }
                });
            }
            else if (limit) {

                db.find({}).limit(limit).toArray(function(err, data) {
                    if (err) {
                        console.error('ERROR from database');
                        res.sendStatus(500); // internal server error
                    }
                    else {
                        if (data.length === 0) {
                            res.sendStatus(404);
                        }
                        console.log("INFO: Sending contacts: " + JSON.stringify(data, 2, null));
                        if (from && to) {

                            aux = buscameDatos(data, aux, from, to);
                            if (aux.length > 0) {
                                res.send(aux);
                            }
                            else {
                                res.sendStatus(404); //Está el from y el to pero está mal hecho
                            }
                        }
                        else {
                            res.send(data);
                        }
                    }
                });
            }
            else if (offset) {

                db.find({}).skip(offset).toArray(function(err, data) {
                    if (err) {
                        console.error('ERROR from database');
                        res.sendStatus(500); // internal server error
                    }
                    else {
                        if (data.length === 0) {
                            res.sendStatus(404);
                        }
                        console.log("INFO: Sending contacts: " + JSON.stringify(data, 2, null));
                        if (from && to) {

                            aux = buscameDatos(data, aux, from, to);
                            if (aux.length > 0) {
                                res.send(aux);
                            }
                            else {
                                res.sendStatus(404); //Está el from y el to pero está mal hecho
                            }
                        }
                        else {
                            res.send(data);
                        }
                    }
                });
            }
            else {

                db.find({}).toArray(function(err, data) {
                    if (err) {
                        console.error('ERROR from database');
                        res.sendStatus(500); // internal server error
                    }
                    else {
                        if (data.length === 0) {
                            res.sendStatus(404);
                        }
                        console.log("INFO: Sending contacts: " + JSON.stringify(data, 2, null));
                        if (from && to) {

                            aux = buscameDatos(data, aux, from, to);
                            if (aux.length > 0) {
                                res.send(aux);
                            }
                            else {
                                res.sendStatus(404); //Está el from y el to pero está mal hecho
                            }
                        }
                        else {
                            res.send(data);
                        }
                    }
                });
            }
        }
    }
};


//GET a un recurso en concreto por el nombre o por el año

module.exports.getDataName = function(req, res) {

    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {

        var country = req.params.name;
        var aux = [];

        if (!country) {
            console.log("BAD Request,try again with new data");
            res.sendStatus(400); // bad request

        }
        else if (!db) {
            res.sendStatus(404); //Base de datos está vacía
        }
        else {
            
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
    
     if (limit && offset) {

                db.find({country : country}).skip(offset).limit(limit).toArray(function(err, data) {
                    if (err) {
                        console.error('ERROR from database');
                        res.sendStatus(500); // internal server error
                    }
                    else {
                        if (data.length === 0) {
                            res.sendStatus(404);
                        }
                        console.log("INFO: Sending contacts: " + JSON.stringify(data, 2, null));
                            res.send(data);
                        
                    }
                });
            }else{
            
            db.find({}).toArray(function(error, conjunto) {

                if (conjunto.length === 0) {
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }
                else {

                    aux = encuentraName(conjunto, aux, country);

                    if (aux.length === 0) {
                        res.sendStatus(404);
                    }
                    else {
                        res.send(aux);
                    }
                }

            });

        }
}
    }
};

//GET A UN RECURSO POR NOMBRE Y AÑO

module.exports.getDataNameYear = function(req, res) {


    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {

        var nombre = req.params.name;
        var year = req.params.year;
        var aux = [];

        if (!nombre || !year) {
            console.log("BAD Request,try again with new data");
            res.sendStatus(400); // bad request

        }
        else if (!db) {
            res.sendStatus(404); //Base de datos está vacía
        }
        else {
            db.find({}).toArray(function(error, conjunto) {

                if (conjunto.length === 0) {
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }
                else {

                    for (var j = 0; j < conjunto.length; j++) {

                        var helpp = conjunto[j];
                        if (isNaN(nombre) && isNaN(parseInt(year)) === false) {
                            if (helpp.country == nombre && helpp.year == parseInt(year)) {
                                aux.push(helpp);

                            }

                        }
                    }

                    if (aux.length === 0) {
                        res.sendStatus(404);
                    }
                    res.send(aux);

                }

            });


        }
    }

};



/**********************POST********************/

//POST a un conjunto 

module.exports.postNewData = (req, res) => {


    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {

        var nuevoDato = null;
        nuevoDato = req.body;
        var sol = false;

        if (nuevoDato === null) {

            res.sendStatus(400); //BAD REQUEST

        }
        else if (!nuevoDato.country || !nuevoDato.year || !nuevoDato.incidence || !nuevoDato.percentage || !nuevoDato.total) {

            res.sendStatus(400);
            console.log("something wrong in your data post,bad request");


        }
        else {
            db.find({}).toArray(function(error, conjunto) {

                if (conjunto.length === 0) {
                    console.log("DB empty");
                    res.sendStatus(404);
                }
                else {

                    for (var i = 0; i < conjunto.length; i++) {

                        if (conjunto[i].country === nuevoDato.country && conjunto[i].year === parseInt(nuevoDato.year)) {
                            res.sendStatus(409);
                            console.log("Error,el dato ya estaba en el conjunto");
                            sol = true;
                        }
                    }

                    if (sol === false) {
                        db.insert(nuevoDato);
                        res.sendStatus(201); //CREATED 
                    }
                }

            });

        }

    }

};


//POST a un recurso en concreto 


module.exports.badpost = (req, res) => {
    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {

        res.sendStatus(405); //Method Not Allowed

        console.log("No se puede hacer un post a un recurso en concreto");
    }

};


/**********************PUT************************/


//PUT a una coleccion de datos

module.exports.badPut = (req, res) => {
    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {
        res.sendStatus(405);
        console.log("No se puede hacer un put a una coleccion de datos");
    }
};


//PUT a un recurso en concreto


module.exports.putTwoData = (req, res) => {

    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {
        var actualiza = req.body;
        var country = req.params.name;
        var year = parseInt(req.params.year);

        if (!actualiza.country || !actualiza.year || !actualiza.incidence || !actualiza.percentage || !actualiza.total) {

            res.sendStatus(400);
            console.log("falta algún parámetro del dato que queremos insertar");

        }
        if (country === actualiza.country && parseInt(year) === parseInt(actualiza.year)) {
            db.update({
                country: country,
                year: year
            }, {
                country: actualiza.country,
                year: actualiza.year,
                incidence: actualiza.incidence,
                total: actualiza.total,
                percentage: actualiza.percentage

            });
            res.sendStatus(200); //OK

        }
        else {
            res.sendStatus(400);
        }
    }
};


/*********************DELETE********************/


//DELETE a una colección de datos

/*module.exports.deleteCollection = (req, res) => {

    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {


        db.remove({}, {
            multi: true
        }, function(err, borr) {
            var numeros = JSON.parse(borr);
            if (err) {
                
                console.error('Error no funciona el Delete de toda la coleccion');
                res.sendStatus(500); // internal server error
            }
            else {
                if (numeros.n> 0) {
                    console.log("Todo borrado ");
                    res.sendStatus(204); // no content
                }
                else {
                    console.log("No hay contactos que borrar");
                    res.sendStatus(404); // not found
                }
            }
        });
    }
};*/

module.exports.deleteCollection = (req, response) =>  {
    var key = req.query.apikey;

    if (!key) {
        response.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        response.sendStatus(403); //Está mal puesta la apikey
    }
    else {
        console.log("INFO: New DELETE request to /hiv-stats");
        db.remove({}, {
            multi: true
        }, function(err, result) {
            var numRemoved = JSON.parse(result);
            if (err) {
                console.error(" removing data from DB");
                response.sendStatus(500); // internal server error
            }
            else {
                if (numRemoved.n > 0) {
                    console.log("INFO: All the hiv-stats (" + numRemoved.n + ") have been succesfully deleted, sending 204...");
                    response.sendStatus(204); // no content
                }
                else {
                    console.log("WARNING: There are no hiv-stats to delete");
                    response.sendStatus(404); // not found
                }
            }
        });
    }
};
//DELETE a un recurso en concreto

module.exports.deleteData = (req, res) => {

    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {
        var country = req.params.country;
        var year = req.params.year;

        if (!country && !year) {
            res.sendStatus(404);

        }
        else {

            if (country) {
                db.remove({
                    country: country
                }, function(error, conjunto) {
                    var numeros = JSON.parse(conjunto);
                    if (error) {
                        console.log("Algo pasa con la base de datos que está vacía");
                        res.sendStatus(404);
                    }
                    else if(numeros.n >0){

                        console.log("El dato se ha borrado satisfactoriamente");
                        res.sendStatus(204);
                    }else {
                        
                        res.sendStatus(404);
                    }

                });
            }
            else if (year) {

                db.remove({
                    year: year
                }, function(error, conjunto) {
                     var numeros = JSON.parse(conjunto);
                    if (error) {
                        console.log("Algo pasa con la base de datos que está vacía");
                        res.sendStatus(404);
                    }
                    else if(numeros.n >0){

                        console.log("El dato se ha borrado satisfactoriamente");
                        res.sendStatus(204);
                    }else {
                        
                        res.sendStatus(404);
                    }

                });


            }
        }

    }
};

module.exports.deleteTwoData = (req, res) => {

    var key = req.query.apikey;

    if (!key) {
        res.sendStatus(401); //No ha puesto la apikey

    }
    else if (!tieneKey(key)) {

        res.sendStatus(403); //Está mal puesta la apikey
    }
    else {

        var country = req.params.country;
        var year = parseInt(req.params.year);

        if (!country) {
            res.sendStatus(404);

        }
        else {
            db.remove({
                country: country,
                year: year
            }, function(error, conjunto) {
var numeros = JSON.parse(conjunto);
                if (error) {
                    console.log("Algo pasa con la base de datos que está vacía");
                    res.sendStatus(404);
                }
                else if(numeros.n > 0) {

                    console.log("El dato se ha borrado satisfactoriamente");
                    res.sendStatus(204);
                }else {
                    res.sendStatus(404);
                }

            });


        }
    }
};




/*************************FUNCIONES AUXILIARES*******************************/




var encuentraName = function(conjunto, conjaux, parametro) {

    if (parametro) {
        for (var i = 0; i < conjunto.length; i++) {

            if (conjunto[i].country === parametro) {
                conjaux.push(conjunto[i]);
            }
            else if (conjunto[i].year === parseInt(parametro)) {

                conjaux.push(conjunto[i]);
            }
        }

    }

    return conjaux;
};


var tieneKey = function(llave) {

    var sol = false;

    if (llave === apikey) {
        sol = true;
    }
    return sol;
};

var meteDatos = function(base) {

    base.insert([{
        "country": "estonia",
        "year": 2013,
        "incidence": 325,
        "total": 8702,
        "percentage": 24.6
    }, {
        "country": "latvia",
        "year": 2013,
        "incidence": 340,
        "total": 5867,
        "percentage": 16.8
    }, {
        "country": "portugal",
        "year": 2013,
        "incidence": 1093,
        "total": 47390,
        "percentage": 10.4
    }, {
        "country": "portugal",
        "year": 2014,
        "incidence": 1433,
        "total": 49050,
        "percentage": 11.2
    }, {
        "country": "belgium",
        "year": 2016,
        "incidence": 14354,
        "total": 23450,
        "percentage": 16.2
    }, {
        "country": "spain",
        "year": 2012,
        "incidence": 11233,
        "total": 76854,
        "percentage": 17.2
    }, {
        "country": "portugal",
        "year": 2016,
        "incidence": 14123,
        "total": 98023,
        "percentage": 17.2
    }, {
        "country": "belgium",
        "year": 2013,
        "incidence": 1115,
        "total": 266850,
        "percentage": 10.0
    }]);

};


var buscameDatos = function(base, conjaux, desde, hasta) {

    var from = parseInt(desde);
    var to = parseInt(hasta);

    for (var j = 0; j < base.length; j++) {
        var t = base[j].year;
        if (from === t || (to >= t && from <= t)) {

            conjaux.push(base[j]);
        }
    }

    return conjaux;

};
