let config = require('../../config');
let log = require("../logging");
async function editProcedure(procedureNameForFinding, procedureName, procedure, publicity, metaData, ownerList, adminList) {
    let editObject = {};
    if (procedureName !== null) {
        editObject["procedureName"] = procedureName;
    }
    if (procedure !== null) {
        editObject["procedure"] = procedure;
    }
    if (publicity !== null) {
        editObject["public"] = publicity;
    }
    if (metaData !== null) {
        editObject["metaData"] = metaData;
    }
    if (ownerList !== null) {
        editObject["owner"] = ownerList;
    }
    if (adminList !== null) {
        editObject["admin"] = adminList;
    }

    let editResult = await this.db.collection(config.database.table).updateOne(
        {
            procedureName: procedureNameForFinding
        },
        {
            $set: editObject
        }

    ).catch(err => {
        log(3,err);
    });
    return editResult;
}
module.exports = editProcedure;