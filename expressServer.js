'use strict';
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');


app.get('/pets', function (req, res) {
    fs.readFile(petsPath, 'utf8', function (err, data) {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
        let pets = JSON.parse(data);
        res.set('Content-Type', 'application/json');
        res.send(pets);
        
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
            return res.sendStatus(404);
        }
        res.sendStatus(200);
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
