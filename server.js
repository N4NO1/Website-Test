'use strict'
require('dotenv').config()


const handleCredentials = require('./js-modules/signInScript.js')
const fs = require('fs')
const md5 = require('md5')
const bodyParser = require('body-parser')
const express = require('express')
const api = express()
const port = process.env.PORT || 8000

console.log("website server started on port:", port)

/*
 * Middleware
 */

api.use("/js-modules", express.static(__dirname + "/js-modules"))

api.use("/css", express.static(__dirname + "/css"))

api.use("/images", express.static(__dirname + "/images"))

api.use(function (req, res, next) {
    console.log(`Requester: [${req.ip}] Address: [${req.hostname}] Resource: [${req.url}]`)
    next()
})

api.use(bodyParser.urlencoded({ extended: false }))


/*
 * GET handlers
 */

api.get('/*', function (req, res) {
    const baseurl = getBaseUrl(req.url)

    switch (baseurl) {

        case "":
            res.sendFile(__dirname + "/html/loading.html")
            break;

        case "favicon.ico":
            res.sendFile(__dirname + "/favicon.ico")
            break;

        default:
            const filepath = __dirname + `/html/${baseurl}.html`
            if (fs.existsSync(filepath)) {
                res.sendFile(filepath)
            }
            else {
                res.statusCode = 404
                res.sendFile(__dirname + "/html/404.html")
            }
        break;

    }

})


/*
 * POST handlers
 */

api.post('/credentials', function (req, res) {
    res.statusCode = 202
    res.json({
        "authenticationToken": handleCredentials(req.body.username, req.body.password)
    })
})



api.listen(port)


function getBaseUrl(url = "") {
    const pathParts = url.split("/")

    return pathParts[pathParts.length - 1]
}