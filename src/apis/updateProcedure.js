let getUserInfoByUserToken = require('../communicateWithOtherServer/getUserInfoByUserTOken');
let Procedure = require('../model/procedureClass');

async function updateProcedure(request, response) {
    if (request.body.procedureName === undefined) {
        response.status(400).send("Procedure Name Required");
        return null;
    }
    if (request.body.procedure === undefined) {
        response.status(400).send("Procedure Required");
        return null;
    }
    if (request.body.userToken === undefined) {
        response.status(400).send("User Token Required");
        return null;
    }

    let userInfo = await getUserInfoByUserToken(request.body.userToken);
    if (userInfo === null) {
        response.status(500).send("Server Error");
        return null;
    }
    if (userInfo === "") {
        console.log("Get user info failed");
        response.send("0");
        return null;
    }
    let procedure = new Procedure();
    let connectionResult = await procedure.connect();
    if (!connectionResult) {
        response.status(500).send("Server Error");
        return null;
    }
    let getProcedureResult = await procedure.getProcedureByName(request.body.procedureName);
    if (getProcedureResult === null) {
        console.log("Get procedure failed");
        response.send("0");
        return null;
    }
    let userID = userInfo.id;
    if (!(getProcedureResult["owner"].includes(userID) || getProcedureResult["admin"].includes(userID))) {
        console.log("Not allow to edit procedure");
        response.send("0");
        return null;
    }
    getProcedureResult["procedure"].push(request.body.procedure);

    let editResult = await procedure.editProcedureByName(request.body.procedureName, null, getProcedureResult["procedure"], null, null, null, null);
    if (editResult.result.ok !== 1) {
        response.status(500).send("Server Error");
        return null;
    }
    if (editResult.result.n === 0) {
        response.send("0");
    }
    response.send("1")

}

module.exports = updateProcedure;