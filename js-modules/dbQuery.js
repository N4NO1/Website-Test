const mysql = require('mysql')

module.exports = queryDb

function queryDb(sql) {
    var dbConnection = mysql.createConnection({
        host: "n4no-api-db1.chc2s4jmmw2m.eu-west-2.rds.amazonaws.com",
        user: "admin",
        password: "Tig3r56734*",
        port: 3306,
        database: "N4NO",
    })

    dbConnection.connect(function (err) {
        if (err) {
            console.error(`Database connection failed: ${err.stack}`)
            return
        }
        console.log("Connected to database")
        console.log(`Querying database using :${sql}`)

        dbConnection.query(sql, function (err, result) {
            if (err) throw err
            console.log("Query Successful, closing connection")
            dbConnection.end()
            return result

        })
    })

}