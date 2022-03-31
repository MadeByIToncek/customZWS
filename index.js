const express = require('express')
const app = express()
const port = 3333
    /*const whitespaces = [
        "​",
        "﻿",
        "᠎"
    ]*/
const whitespaces = [
    "a",
    "b",
    "c"
]

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

function makeid(length) {
    var result = '';
    var charactersLength = whitespaces.length;
    for (var i = 0; i < length; i++) {
        result += whitespaces[(Math.floor(Math.random() *
            charactersLength))];
    }
    return result;
}

app.set("view engine", "ejs");

app.get('/:id', (req, res) => {
    console.log(id)
    res.render('index')
})

app.get('/:id', (req, res) => {
    res.render('index')
})

app.put('/add', express.json(), (req, res) => {
    const url = makeid(12);
    console.log(req.body)
    res.json({ url: "http://localhost:3333/" + url, delurl: "http://localhost:3333/delete" + url })
})

app.delete('/delete', express.json(), (req, res) => {
    console.log(req.body)
    res.json()
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})