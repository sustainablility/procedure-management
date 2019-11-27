let getUserInfoByUserToken = require('../communicateWithOtherServer/getUserInfoByUserTOken');
let Procedure = require('../model/procedureClass');

async function editProcedureInfo(request, response) {
    if (request.body.procedureName === undefined) {
        console.log(1);
        response.status(400).send("Procedure Name Required");
        return null;
    }
    if (request.body.procedureInfo === undefined) {
        console.log(2);
        response.status(400).send("Procedure Required");
        return null;
    }
    if (request.body.userToken === undefined) {
        console.log(3);
        response.status(400).send("User Token Required");
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
    let getProcedureResult = await procedure.getProcedureByName(request.body.procedureName);
    if (getProcedureResult === null) {
        response.send("0");
        return null;
    }
    let userID = userInfo.id;
    if (!(getProcedureResult["owner"].includes(userID))) {
        response.send("0");
        return null;
    }
    let updateProcedureBody = {
        procedureName: null,
        public: null,
        metaData: null
    };
    if (request.body.procedureInfo.procedureName !== undefined) {
        updateProcedureBody["procedureName"] = request.body.procedureInfo.procedureName;
    } else {}
    if (request.body.procedureInfo.public !== undefined) {
        updateProcedureBody["public"] = request.body.procedureInfo.public;
    }
    if (request.body.procedureInfo.metaData !== undefined) {
        updateProcedureBody["metaData"] = request.body.procedureInfo.metaData;
    }

    let editResult = await procedure.editProcedureByName(request.body.procedureName, updateProcedureBody.procedureName, null, updateProcedureBody.public, updateProcedureBody.metaData, null, null);
    if (editResult.result.ok !== 1) {
        response.status(500).send("Server Error");
        return null;
    }
    if (editResult.result.n === 0) {
        response.send("0");
    }
    response.send("1")

}

module.exports = editProcedureInfo;