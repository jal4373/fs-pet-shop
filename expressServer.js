'use strict';
let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
let morgan = require('morgan'); //Morgan is used for logging request details.
let bodyParser = require('body-parser');

// app.disable('x-powered-by'); //Sets the Boolean setting name to false
app.use(morgan('short')); 
app.use(bodyParser.json()); //tells the system that you want json to be used

app.get('/pets', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        // res.sendStatus(200);
        let pets = JSON.parse(data);
        res.set('Content-Type', 'application/json');
        res.send(pets);
    });
});

app.post('/pets', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let pets = JSON.parse(data);
        let name = req.body.name;
        let age = parseInt(req.body.age);
        let kind = req.body.kind;

        let pet = {
            name,
            age,
            kind
        };

        if (!age || !kind || !name) {
            return res.sendStatus(400);
        }

        pets.push(pet);
        console.log(pet);

        let newPetsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, newPetsJSON, function (writeErr) {
            if (writeErr) {
                console.error(writeErr.stack);
                return res.sendStatus(500);
            }

            res.set('Content-Type', 'application/json'); 
            res.send(pet);
        });

    });
});


app.get('/pets/:id', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        let id = Number.parseInt(req.params.id);
        let pets = JSON.parse(data);

        if (id < 0 || id >= pets.length || Number.isNaN(id)) {
            res.sendStatus(404);
            return res.send('Not Found');
            
        }

        res.set('Content-Type', 'application/json');
        res.send(pets[id]);
    });
});


app.use(function (req, res) {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});
module.exports = app;