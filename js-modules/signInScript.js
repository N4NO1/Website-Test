const md5 = require('md5')
module.exports = handleCredentials

const { RDSClient, AddRoleToDBClusterCommand } = require("@aws-sdk/client-rds");

function handleCredentials(username, password) {

        const credMatch = { result: "test" }

        return credMatch
}