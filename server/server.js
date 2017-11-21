var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();

var app = express();
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//configuring database
var config = {
    database: 'shoe_store', //the name of our database
    host: 'localhost', //where is your database (which computer)
    port: 5432, //the port number of your database, 5432 is default
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000 //30 seconds to try to connect to our database
};

var pool = new pg.Pool(config);


//for localhost:5000/shoes should return array of shoe objects
app.get('/shoes', function(req,res){
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!
            //Now, we're going to GET things from the DB
            client.query('SELECT * FROM shoes;', function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    //Query failed.  Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.send(result.rows);
                }
            });
        }
    });
});

app.post('/shoes', function (req,res){
    //Attempt to connect to database
    pool.connect(function(errorConnectingToDatabase, client, done){
        if(errorConnectingToDatabase){
            //There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!
            //Now, we're going to GET things from the DB
            //use ES6 backtick ` to select multi lines below****
            client.query(`INSERT INTO shoes (name, cost)
            VALUES ($1, $2);`, [req.body.name, req.body.cost], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    //Query failed.  Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201); //201 is status 'created'
                }
            });
        }
    });
})

app.listen(port, function(){
    console.log('server is listening on port', port);
});