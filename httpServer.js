'use strict';

let fs = require('fs'); // API for interacting with file system
let path = require('path'); // API for handling and transforming file paths across different operating systems. 
let petsPath = path.join(__dirname, 'pets.json'); // __dirname is the directory name of the current module. This is the same as the path.dirname() of the __filename.

let http = require('http'); //To use the HTTP server and client
let port = process.env.PORT || 8000; //tells what port to listen on

//creating an instance of server, using the createServer method of http
let server = http.createServer(function (req, res) { // req=request res=response

    fs.readFile(petsPath, 'utf8', function (err, petsJSON) {

        if (err) {
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
            return res.end('Internal Server Error');
        }

        let petRegExp = /\/pets\/(\d*)/;
        let reqNumberExists = petRegExp.test(req.url); // check if numbers exist in the request
        let pets = JSON.parse(petsJSON); // convert json data to javascript


        if ((req.url.split('/').includes('pets')) && (req.method === 'GET')) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json'); //set name of header and value to the response

            if (reqNumberExists) {
                let index = req.url.match(petRegExp)[1]; // capture the requested index number
                if (index < pets.length) {
                let petJSON = JSON.stringify(pets[index]); //JSON.stringify() method converts a JavaScript value to a JSON string
                res.end(petJSON); //end method is our server's way of saying "ship it!"
                }
            } else {
                res.end(petsJSON); //end method is our server's way of saying "ship it!"
            }

        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
            res.end('Not Found')
        }



        // let index = (req.url.match(petRegExp)[2]);
        // //check if req.url (/pets) exists in url and if GET method was used 
        // if ((doesPetsExist === false) || (req.method !== 'GET') || (index = undefined) || (index > pets.length)) {
        //     res.statusCode = 404;
        //     res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
        //     res.end('Not Found')
        // } else {
        //     res.statusCode = 200;
        //     let pets = JSON.parse(petsJSON);
        //     let index = (req.url.match(petRegExp)[2]);

        //     if (index = undefined || index > pets.length) {

        //     }
        //     let petJSON = JSON.stringify(pets[index]);
        //     res.setHeader('Content-Type', 'application/json'); //set name of header and value to the response
        //     res.end(petJSON); //end method is our server's way of saying "ship it!"
        // }

    });
    // console.log(req);
    // if (req.method === 'GET' && req.url === '/pets') {
    //     fs.readFile(petsPath, 'utf8', function (err, petsJSON) {

    //         if (err) {
    //             console.error(err.stack);
    //             res.statusCode = 500;
    //             res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
    //             return res.end('Internal Server Error')
    //         }
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type', 'application/json'); //set name of header and value to the response
    //         res.end(petsJSON); //end method is our server's way of saying "ship it!"
    //     });

    // } else if (req.method === 'GET' && req.url === '/pets/0') {
    //     const petRegExp = /^\/pets\/(.*)$/;
    //     req.url.match(petRegExp)

    //     fs.readFile(petsPath, 'utf8', function (err, petsJSON) {

    //         if (err) {
    //             console.error(err.stack);
    //             res.statusCode = 500;
    //             res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
    //             return res.end('Internal Server Error')
    //         }
    //         res.statusCode = 200;
    //         let pets = JSON.parse(petsJSON);
    //         let petJSON = JSON.stringify(pets[0]);
    //         res.setHeader('Content-Type', 'application/json'); //set name of header and value to the response
    //         res.end(petJSON); //end method is our server's way of saying "ship it!"
    //     });
    // } else if (req.method === 'GET' && req.url === '/pets/1') {
    //     fs.readFile(petsPath, 'utf8', function (err, petsJSON) {

    //         if (err) {
    //             console.error(err.stack);
    //             res.statusCode = 500;
    //             res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
    //             return res.end('Internal Server Error')
    //         }
    //         res.statusCode = 500;
    //         let pets = JSON.parse(petsJSON);
    //         let petJSON = JSON.stringify(pets[1]);
    //         res.setHeader('Content-Type', 'application/json'); //set name of header and value to the response
    //         res.end(petJSON); //end method is our server's way of saying "ship it!"
    //     });

    // } else {
    //     res.statusCode = 404;
    //     res.setHeader('Content-Type', 'text/plain'); //set name of header and value to the response
    //     res.end('Not Found')
    // }
});

server.listen(port, function () {
    console.log('Listening on port', port);
});
module.exports = server;