let request = require('request-promise');
let config = require('../../config');
let encryption = require('../microservice-communication-encryption/index');
let log = require("../logging");

async function addProcedure(userToken, procedureName) {

    let response = await request({
        uri: config.addProcedureIntoUserDatabaseUrl,
        qs: {
            token: encryption.encrypt(userToken),
            procedure: encryption.encrypt(procedureName)
        }
    }).catch(err => {
        log(3, err);
    });
    if (response === undefined) {
        return null;
    }
    return response === "1";
}

module.exports = addProcedure;