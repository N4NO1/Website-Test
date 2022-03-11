'use strict';
const express = require('express')
const api = express()

api.get('/', function (req, res) {
    console.log("accessed")
    res.sendFile(__dirname + "/sign-in.html")
})

api.post('/signin', function (req, res) {
    res.json({state: "accepted"})
})



api.listen(3001)
