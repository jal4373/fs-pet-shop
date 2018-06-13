'use strict';


let fs = require('fs'); // API for interacting with file system
let path = require('path'); // API for handling and transforming file paths across different operating systems. 
let petsPath = path.join(__dirname, 'pets.json'); // __dirname is the directory name of the current module. This is the same as the path.dirname() of the __filename.

let commands = ['read', 'create', 'update', 'destroy'];

//path.baseline returns the last portion of a petsPath
//process.argv returns an array containing the command line arguments
let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);

let cmd = process.argv[2];

if (commands.indexOf(cmd) == -1) {
    console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
    process.exit(1);
}
// else {
//     console.log(commands[commands.indexOf(cmd)]);
// }



if (cmd === 'read') {
    fs.readFile(petsPath, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        //turns JSON string into object
        let pets = JSON.parse(data);

        let index = process.argv[3];

        //If the index is a valid value
        if (!((pets[index] == undefined) || !(index))) {
            console.log(pets[index]);
            //if the index isn't a valid value or if it doesn't exist
        } else {
            console.log(pets);
            console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        }
    });

} else if (cmd === 'create') {
    fs.readFile(petsPath, 'utf8', function (readErr, data) {
        if (readErr) {
            throw readErr;
        }
        //turns JSON string into object
        let pets = JSON.parse(data);

        let age = parseInt(process.argv[3]);
        let kind = process.argv[4];
        let name = process.argv[5];
        // definePet()
        let pet = {
            age: age,
            kind: kind,
            name: name
        };

        //Shorthand is {age, kind, name};
        if (!(age) || !(kind) || !(name)) {
            console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
            process.exit(1); //The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code.
        }

        //add pet object to pets array of objects
        pets.push(pet);

        //JSON.stringify() method converts a JavaScript value to a JSON string
        let petsJSON = JSON.stringify(pets);

        //Asynchronously writes data to a file, replacing the file if it already exists. 
        //Data can be a string or a buffer.
        fs.writeFile(petsPath, petsJSON, function (writeErr) {
            if (writeErr) {
                throw writeErr;
            }

            console.log(pet);
        });
    });

} else if (cmd === 'update') {

    fs.readFile(petsPath, 'utf8', function (readErr, data) {
        if (readErr) {
            throw readErr;
        }
        // turns JSON string into object
        let pets = JSON.parse(data);

        let index = parseInt(process.argv[3]);
        // defineAgeKindName(4, 5, 6);
        let age = parseInt(process.argv[4]);
        let kind = process.argv[5];
        let name = process.argv[6];
        // definePet()
        let pet = {
            age: age,
            kind: kind,
            name: name
        };
        //Shorthand is {age, kind, name};


        if (!(age) || !(kind) || !(name)) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
            process.exit(1); //The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code.
        }

        //update
        pets[index] = pet;

        //JSON.stringify() method converts a JavaScript value to a JSON string
        let petsJSON = JSON.stringify(pets);

        //Asynchronously writes data to a file, replacing the file if it already exists. 
        //Data can be a string or a buffer.
        fs.writeFile(petsPath, petsJSON, function (writeErr) {
            if (writeErr) {
                throw writeErr;
            }

            console.log(pet);
        });
    });

} else if (cmd === 'destroy') {



    fs.readFile(petsPath, 'utf8', function (readErr, data) {
        if (readErr) {
            throw readErr;
        }
        // turns JSON string into object
        let pets = JSON.parse(data);
        let index = process.argv[3];

        if (!((pets[index] == undefined) || !(index))) {
            console.log(pets[index]);
            pets.splice(index, 1);

        } else {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
            process.exit(2);
        }
        // definePet();
        //JSON.stringify() method converts a JavaScript value to a JSON string
        let petsJSON = JSON.stringify(pets);

        //Asynchronously writes data to a file, replacing the file if it already exists. 
        //Data can be a string or a buffer.
        fs.writeFile(petsPath, petsJSON, function (writeErr) {
            if (writeErr) {
                throw writeErr;
            }

            // console.log(pet);
        });
    });



} else {
    console.error(`Usage: ${node} ${file} [read | create]`);
    process.exit(1);
}

module.exports = app;

// function defineAgeKindName(ageArgv, kindArgv, nameArgv) {
//     let age = parseInt(process.argv[ageArgv]);
//     let kind = process.argv[kindArgv];
//     let name = process.argv[nameArgv];
//     definePet();
// }

// function definePet() {
//     let pet = {
//         'age': age,
//         'kind': kind,
//         'name': name
//     };
// }