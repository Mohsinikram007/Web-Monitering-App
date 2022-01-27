const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
var https = require('https');
const {mongoose} = require('./db.js');
var webController = require('./controller/webcontroller.js')


var app = express();
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:4200"}));

app.listen(3004,()=>{
    console.log("server starter on port 3004");


})
app.use('/website',webController);

