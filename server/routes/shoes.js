var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

//for localhost:5000/shoes should return array of shoe objects
router.get('/', function(req,res){
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

router.post('/', function (req,res){
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


module.exports = router;
