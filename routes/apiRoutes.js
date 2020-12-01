const path = require('path');
const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const newData = require('../db/db.json');


//Routes
//Get /api/notes that reads db.json and returns saved notes as JSON
router.get('/api/notes', (_req, res) => {
    console.log('working');
    fs.readFile(path.join(__dirname, '/../db/db.json'), 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        }
        res.json(JSON.parse(data));
    });
    console.log('Read json file')
});
//POST /api/notes that recieves a new note to save on request body, add it to the db.json file, and then return new note to client
router.post('/api/notes', (_req, res) => {
    _req.body.id = uuidv4();
    fs.readFile(path.join(__dirname, '/../db/db.json'), 'utf8', function (err, data) {
        if (err) {
            console.log(err)
        };
        const notes = JSON.parse(data);
        console.log('Read json file');
        notes.push(_req.body);
        fs.writeFile(path.join(__dirname, '/../db/db.json'), JSON.stringify(notes), (err) => {
            if (err)
                console.log(error);
            else {
                console.log('note successfully added');
                res.json(true);
            };
        });
    });
});

//DELETE /api/notes/:id that recieves a query parameter with id of note to delete. Must give each new note a unique id. Must read all notes from db.json file, remove the note, then rewrite db.json file. 
// router.delete('/api/notes',) Add id to json 
router.delete('/api/notes/:id', (_req, res) => {
    const deleteID = _req.params.id;
    console.log(deleteID);
    for (i = 0; i < newData.length; i++) {
        if (newData[i].id === deleteID) {
            newData.splice(i, 1);
        };
    };

    fs.writeFile(path.join(__dirname, '/../db/db.json'), JSON.stringify(newData), (err) => {
        if (err)
            console.log(error);
        else {
            console.log('note successfully deleted');
            res.json(true);
        };
    });
});

module.exports = router;