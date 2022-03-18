const md5 = require('md5')

const queryApiDb = require('./server-dbQuery')

module.exports = handleCredentials





async function handleCredentials(username, password) {
        
        var searchSql = `SELECT * FROM userAccounts WHERE username = '${username}'`

        const results =  await queryApiDb(searchSql)

        //check a result was returned
        if(results.length != 0) {
                const userData = results[0]
                //check if the password mathces the stored password
                if (md5(password) == userData.passwordHash){
                        console.log("hashes match")

                        creds= userData.uId

                        return creds

                }
                return 401
        }

        return 404
}