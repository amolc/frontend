var express = require('express');
var app = express();
var path = require('path');
var serveStatic = require('serve-static');
var bodyParser = require("body-parser");
var multer = require('multer');
const upload = multer({ dest: 'uploads/' })


// handle cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Access-Control-Allow-Credentials", false);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb", extended: true, type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, type: "application/x-www-form-urlencoding" }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw({ limit: "50mb" }));

app.use('/angular', express.static(__dirname + '/angular'));
app.use('/', express.static(__dirname + '/smartportfolio'));
app.use('/superadmin', express.static(__dirname + '/superadmin'));
app.use('/indianmango', express.static(__dirname + '/indianmango'));
app.use('/myadmin', express.static(__dirname + '/myadmin'));
app.use('/autotrader', express.static(__dirname + '/autotrader'));

global.appRoot = path.resolve(__dirname);
app.listen(20000);
console.log('server is started at port: 20000');