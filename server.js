'use strict'
require('dotenv').config()

const md5 = require('md5')
const bodyParser = require('body-parser')
const express = require('express')
const api = express()
const port = process.env.PORT || 8000

console.log("website server started on port:", port)

/*
 * Middleware
 */

api.use("/css", express.static(__dirname + "/css"))

api.use(function (req,res,next) {
    console.log("Accessed ip " + req.ip, req.hostname + req.url)
    next()
})

api.use(bodyParser.urlencoded({extended: false}))
/*
 * GET handlers
 */

api.get('/', function (req, res) {
    res.sendFile(__dirname + "/html/sign-in.html")
})

/*
 * POST handlers
 */

api.post('/signin', function (req, res) {
    res.json({
        state: "accepted",
        username: req.body.username,
        passwordHash: md5(req.body.password)
    })
})



api.listen(port)
