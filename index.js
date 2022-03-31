const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const w = [
    "​",
    "﻿",
    "᠎"
]
const wa = [
    "a",
    "b",
    "c"
]

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

const Model = mongoose.model('Link', {
    _id: String,
    id: String,
    targetUrl: String,
    user: String
});

function makeid(length) {
    var result = '';
    var charactersLength = w.length;
    for (var i = 0; i < length; i++) {
        result += w[(Math.floor(Math.random() *
            charactersLength))];
    }
    return result;
}

app.set("view engine", "ejs");

app.get('/:id', (req, res) => {
    var id = req.params.id
    id = id.replace('​', 'a')
    id = id.replace('﻿', 'b')
    id = id.replace('᠎', 'c')
    Model.find({ _id: id }, function(err, result) {
        if (Array.from(result).length == 0) {
            res.send("We were unable to locate this link...are you sure it's correct?");
        } else {
            res.render('link', { url: result[0].targetUrl })
        }
    })
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/generate/:name', (req, res) => {
    res.set({ "Content-Disposition": "attachment; filename=\"zws.sxcu\"" })
    res.send('{ "Version": "13.7.0", "Name": "ajtonckovo ZWS", "DestinationType": "URLShortener", "RequestMethod": "PUT", "RequestURL": "https://l.itoncek.cf/add", "Body": "JSON", "Data": "{\"input\":\"$input$\",\"user\":\"' + req.params.name + '\"}", "URL": "$json:url$\"\}')
})

app.put('/add', express.json(), (req, res) => {
    const url = makeid(12);
    var id = url
    id = id.replace('​', 'a')
    id = id.replace('﻿', 'b')
    id = id.replace('᠎', 'c')
    const database = new Model({
        _id: id,
        id: url,
        targetUrl: req.body.input,
        user: req.body.user
    });
    database.save();
    res.json({ url: "https://l.itoncek.cf/" + url })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})