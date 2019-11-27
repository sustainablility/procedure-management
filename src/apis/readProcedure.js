let getUserInfoByUserToken = require('../communicateWithOtherServer/getUserInfoByUserTOken');
let Procedure = require('../model/procedureClass');

async function readProcedure(request, response) {
    if (request.body["userToken"] === undefined || request.body["procedureName"] === undefined) {
        response.status(400).send("Lack of parameters");
        return null;
    }
    let userInfo = await getUserInfoByUserToken(request.body.userToken);
    if (userInfo === null) {
        response.status(500).send("Server Error");
        return null;
    }
    if (userInfo === "") {
        response.send("0");
        return null;
    }
    let procedure = new Procedure();
    let connectionResult = await procedure.connect();
    if (!connectionResult) {
        response.status(500).send("Server Error");
        return null;
    }
    let procedureInfo = await procedure.getProcedureByName(request.body["procedureName"]);
    if (procedureInfo === null) {
        response.send("");
        return null;
    }
    console.log(procedureInfo);
    if (procedureInfo["public"] === 0) {
        if (!(procedureInfo["owner"].includes(userInfo.id) || procedureInfo["admin"].includes(userInfo.id))) {
            response.send("");
            return null;
        }
    }
    response.send(JSON.stringify(procedureInfo));
}

module.exports = readProcedure;