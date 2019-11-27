let app = require('express')();
let config = require('./config');
let bodyParser = require('body-parser');
let cors = require('cors');
app.use(cors());

app.use(bodyParser.json({limit: '1mb'}));



async function service(){
    app.post("/updateProcedure", await require('./src/apis/updateProcedure'));
    app.post("/editProcedureInfo", await require('./src/apis/editProcedureInfo'));
    app.post("/getProcedure", await require('./src/apis/readProcedure'));
    app.post("/addProcedure", await require('./src/apis/addProcedure'));
    app.listen(config.listenOnPort);
}

service();