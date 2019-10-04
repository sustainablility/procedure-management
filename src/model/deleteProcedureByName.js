let config = require('../../config');
let log = require("../logging");
async function deleteProcedureByName(procedureName) {
    let result = this.db.collection(config.database.table).deleteOne({procedureName:procedureName}).catch(err => {
        log(3,err);
    });
    return result;
}

module.exports = deleteProcedureByName;