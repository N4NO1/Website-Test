'use strict'
require('dotenv').config()

const express = require('express')
const api = express()
const port = process.env.PORT || 80

console.log("website server started on port:", port)

//app.use
api.use("/css", express.static(__dirname + "/css"))

api.use(function (req,res,next) {
    console.log("Accessed ip " + req.ip, req.hostname + req.url)
    next()
})

/*
 * GET handlers
 */

api.get('/', function (req, res) {
    res.sendFile(__dirname + "/sign-in.html")
})

/*
 * POST handlers
 */

api.post('/signin', function (req, res) {
    res.json({state: "accepted"})
})



api.listen(port)
