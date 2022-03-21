const queryApiDb = require('./server-dbQuery')

module.exports = createUser

async function createUser(userDetails = {}) {

    const sql = `INSERT INTO userAccounts VALUES (UUID(), '${userDetails.email}', MD5('${userDetails.password}'))`

    console.log(sql)

    return true
}