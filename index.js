/**
 * Created by Stukolov on 06.02.2017.
 */
var express = require("express");
var cfenv = require("cfenv");

var app = express();

app.get('/', function (req, res) {
    res.send('<h1>Hello, IOT World!</h1>');
});
var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function () {
    console.log('Example app listening on port 3000!');
});

/*
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});*/
