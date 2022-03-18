const mysql = require('mysql')

module.exports = queryApiDb

function queryApiDb(sql) {
    return new Promise((resolve, reject) => {
        var dbConnection = mysql.createConnection({
            host: "n4no-api-db1.chc2s4jmmw2m.eu-west-2.rds.amazonaws.com",
            user: "admin",
            password: "Tig3r56734*",
            port: 3306,
            database: "N4NO",
        })

        dbConnection.connect((err) => {
            if (err) {
                console.error(`Database connection failed: ${err.stack}`)
                return reject(err)
            }
            console.log("Connected to database")
            console.log(`Querying database using :${sql}`)

            dbConnection.query(sql, (err, result) => {
                if (err) return reject(err) 
                console.log("Query Successful, closing connection")
                dbConnection.end()
                return resolve(result) 
            })
        })
    })

}