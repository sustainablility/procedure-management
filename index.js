let app = require('express')();
let config = require('./config');
let bodyParser = require('body-parser');
let cors = require('cors');
app.use(cors());

app.use(bodyParser.json({limit: '1mb'}));



async function service(){
    app.post("/updateProcedure", await require('./src/apis/updateProcedure'));
    app.listen(config.listenOnPort);
}

service();