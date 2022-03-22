const queryApiDb = require('./server-dbQuery')

module.exports = createUser

async function createUser(userDetails = {}) {

    try {
        const createSql = `INSERT INTO userAccounts VALUES (UUID(), '${userDetails.email}', MD5('${userDetails.password}'), 'USER')`
        const getSql = `SELECT * FROM userAccounts WHERE username = '${userDetails.email}'`

        const usernameTest = await uniqueEmail(userDetails.email)

        if (usernameTest) {

            //create user
            const userCreated = await queryApiDb(createSql)
            console.log(userCreated)

            const userDetails = await queryApiDb(getSql)

            if (userDetails.length != 0) {
                return {
                    status: "success",
                    code:201,
                    message: userDetails[0].uId
                }
            }
            else {
                return {
                    status: "error",
                    code: 500,
                    message: "Getting details from database failed"
                }


            }

        }
        else {
            return {
                status: "error",
                code: 400,
                message: "An account with that email already exists"
            }
        }
    }
    catch (e) {
        return e
    }


}

async function uniqueEmail(email) {

    const users = await queryApiDb(`SELECT * FROM userAccounts WHERE username = '${email}'`)

    if (users.length == 0) {
        return true
    }
    return false

}