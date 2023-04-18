const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./Develop/db/db.json');
const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(noteData);
})