let request = require('request-promise');
let config = require('../../config');
let encryption = require('../microservice-communication-encryption/index');
let log = require("../logging");

async function getUserInfo(userToken) {

    let response = await request({
        uri: config.getUserInfoByUserTokenURL,
        qs: {
            token: userToken
        }
    }).catch(err => {
        log(3, err);
    });
    if (response === undefined) {
        return null;
    }
    if (response === "") {
        return "";
    }
    let userInfoJson = encryption.decrypt(response);
    return JSON.parse(userInfoJson);
}

module.exports = getUserInfo;