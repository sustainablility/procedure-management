let mongoClient = require('mongodb').MongoClient;
let databaseConfig = require('../../config').database;
let log = require('../logging');

class ProcedureClass {

    constructor(){
        this.getProcedureByName = require('./getProcedureByName');
        this.putNewProcedure = require('./putNewProcedure');
        this.deleteProcedureByName = require('./deleteProcedureByName');
        this.editProcedureByName = require("./editProcedureByName")
    }

    async connect() {
        let dbUrl = "mongodb://" + databaseConfig.host + ":" + databaseConfig.port + '/';
        let dbs = await mongoClient.connect(dbUrl,{ useNewUrlParser: true }).catch(error => {
            log(3, error);
        });
        if (dbs === undefined) {
            return false;
        } else {
            this.done = () => {
                dbs.close();
            };
            this.db = dbs.db(databaseConfig.db);
            return true;
        }
    }
}

module.exports = ProcedureClass;