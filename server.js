'use strict'
require('dotenv').config()


const handleCredentials = require('./js-modules/server-modules/server-signIn.js')
const createUser = require('./js-modules/server-modules/server-register')
const fs = require('fs')
const express = require('express')
const api = express()
const port = process.env.PORT || 8000

console.log("website server started on port:", port)

/* 
 * Middleware
 */

//can be used to block IP addresses
// api.use((req,res, next) =>{
//     if(req.ip =="::ffff:10.230.133.161") {
//         res.send("Blocked")
//     }
//     else {next()}
// })

api.use(express.json())

api.use("/js-modules", express.static(__dirname + "/js-modules/client-modules"))

api.use("/css", express.static(__dirname + "/css"))

api.use("/images", express.static(__dirname + "/images"))

api.use((req, res, next) => {
    console.log(`Requester: [${req.ip}] Address: [${req.hostname}] Resource: [${req.url}]`)
    next()
})




/*
 * GET handlers
 */

api.get('/user-home/:userId', (req, res) => {
    res.sendFile(__dirname + "/html/user-home.html")
})

api.get('/*', (req, res) => {
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
                    "userId": credentials
                })
            break;
        }

        
    }
    catch {
        res.sendStatus(500)
    }


})

api.post('/register-user', async (req,res) => {
    try {
        const userCreated = await createUser(req.body)
        if (userCreated.status == "success") {
            res.statusCode = userCreated.code
            res.json({userId: userCreated.message})
        }
        else {
            res.statusCode = userCreated.code
            res.json(userCreated.message)
        }
    }
    catch (e) {
        res.statusCode = 500
        console.log(e)
        res.send(e)
    }
})

api.listen(port)


function getBaseUrl(url = "") {
    const pathParts = url.split("/")
    const endPath = pathParts[pathParts.length -1].split("?")[0]

    return endPath
}