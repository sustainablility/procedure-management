let config = require('../../config');
let log = require("../logging");
async function getProcedureByName(procedureName) {
    let result = this.db.collection(config.database.table).find({procedureName:procedureName}).toArray().catch(err => {
        log(3,err);
    });
    if (result === undefined){
        return null;
    }else {
        return result;
    }
}

module.exports = getProcedureByName;