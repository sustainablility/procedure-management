let config = require('../../config');
let log = require("../logging");
async function newProcedure(procedureName, procedure, publicity, metaData, ownerList, adminList) {
    let insertObject = {
        procedureName: procedureName,
        procedure: procedure,
        public: publicity,
        metaData: metaData,
        owner: ownerList,
        admin: adminList
    };
    let insertResult = await this.db.collection(config.database.table).insertOne(insertObject).catch(err => {
        log(3,err);
    });
    return insertResult;
}
module.exports = newProcedure;