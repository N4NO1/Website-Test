'use strict'
require('dotenv').config()


const handleCredentials = require('./js-modules/server-modules/server-signIn.js')
const fs = require('fs')
const express = require('express')
const api = express()
const port = process.env.PORT || 8000

console.log("website server started on port:", port)

/* 
 * Middleware
 */

api.use(express.json())

api.use("/js-modules", express.static(__dirname + "/js-modules/client-modules"))

api.use("/css", express.static(__dirname + "/css"))

api.use("/images", express.static(__dirname + "/images"))

api.use(function (req, res, next) {
    console.log(`Requester: [${req.ip}] Address: [${req.hostname}] Resource: [${req.url}]`)
    next()
})




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

api.post('/credentials', async (req, res) => {
    var credentials = ""
    try {
        credentials = await handleCredentials(req.body.username, req.body.password)

        switch (credentials){
            case 404:
                res.sendStatus(404)
            break;
            case 401:
                res.sendStatus(401)
            break;
            default:
                res.statusCode = 202
                res.json({
                    userId: credentials
                })
            break;
        }

        
    }
    catch {
        res.sendStatus(500)
    }


})



api.listen(port)


function getBaseUrl(url = "") {
    const pathParts = url.split("/")

    return pathParts[pathParts.length - 1]
}