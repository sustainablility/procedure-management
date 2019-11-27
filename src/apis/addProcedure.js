let getUserInfoByUserToken = require('../communicateWithOtherServer/getUserInfoByUserTOken');
let Procedure = require('../model/procedureClass');
let addProcedureToUserDatabase = require('../communicateWithOtherServer/addProcedureToUserDatabase');

async function addProcedure(request, response) {
    if (request.body["procedureName"] === undefined) {
        response.status(400).send("Procedure Name Required");
        return null;
    }
    if (request.body["userToken"] === undefined) {
        response.status(400).send("User Token Required");
        return null;
    }

    let userInfo = await getUserInfoByUserToken(request.body["userToken"]);
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
    let userID = userInfo.id;
    let newProcesult = await procedure.putNewProcedure(request.body["procedureName"] , [""], 1, "", [userID], []);
    if (newProcesult === null) {
        response.send("0");
        return null;
    }
    if (newProcesult.result.ok !== 1) {
        response.status(500).send("Server Error");
        return null;
    }
    if (newProcesult.result.n === 0) {
        response.send("0");
    }
    let addToUserDatabaseResult = await addProcedureToUserDatabase(request.body["userToken"], request.body["procedureName"]);
    if (addToUserDatabaseResult === undefined) {
        response.send("0");
    }
    if (!addToUserDatabaseResult) {
        response.send("0");
    }
    response.send("1")

}

module.exports = addProcedure;