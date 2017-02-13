/**
 * Created by Stukolov on 06.02.2017.
 */
var express = require("express");
var cfenv = require("cfenv");
require('dotenv').load();
var Cloudant = require('cloudant');
var dateFormat = require('dateformat');


var app = express();

app.get('/', function (req, res) {
    res.send('<h1>Hello, IOT World!</h1>');
});

app.get('/iot', function (req, res) {
    res.send('<h1>This is IOT page!</h1>');
});
mymodule2 = require('./mymodules/mymodule2');
mymodule2.fun();
console.log(mymodule2.print())

//Connect to CloudantDatabase
var user = '3001d0cb-d7a0-4bc7-9b9d-af8547c9534e-bluemix'; // Set this to your own account
var password = "e1c74b3c6cc9d597387c58ef9868da4d4ffd47800fa490c317427fdc3aba48f5";
var cloudant = Cloudant({account:user, password:password});
cloudant.db.list(function(err, allDbs) {
    console.log('All my databases: %s', allDbs.join(', '))
});
var db = cloudant.db.use('rawsmartcooler');
var lenght = 2;
var data =[];
app.get('/data', function (req, res) {
    var page = '<h1>Массив данных из базы</h1>';
    page += '</br>';
    page += '<h2>' + data.length +'</h2>';
    page += '<table style="width:100%">';
    for (var i = 0; i < data.length; i++) {
        page += '<tr>';
        page += '<td>' + data[i].date +'</td>';
        page += '<td>' + data[i].currentWeight +'</td>';
        page += '</tr>';
        //console.log('mydata id: %s, %s', i, data[i].date, data[i].currentWeight);
    }
    page += '</table>';
    res.send(page);
});
app.get('/hdata', function(req, res) {
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = "index.html";
    res.sendFile(fileName, options);
});
app.get('/jqplot', function(req, res) {
    var options = {
        root: __dirname + '/public/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = "jqplot.html";
    res.sendFile(fileName, options);
});

app.get("/string", function(req, res) {
    var strings = ["string1", "string2", "string3"]
    var n = Math.floor(Math.random() * strings.length)
    res.send(strings[n])
});
app.get("/dbdata", function(req, res) {
    res.send(data)
});

app.get("/currentweight", function(req, res) {

    var curvalue;
    db.find
    ({selector:{
                'date':{'$gt': '2017-02-07T15:15:54.946Z'}},
                /*sort : [{'date': 'desc'}],*/
                limit: 1}, function(er, result) {
        if (er) {
            throw er;
        }
        curvalue = (result.docs[0].currentWeight - result.docs[0].dryWeight)/21880;
        res.send(curvalue.toString());
    });

});

function startserver(myarr){
    lenght = myarr.length;
    data = myarr;
    console.log('Data lenght: %s', lenght);
    var hostPort = 4444;
    app.listen(hostPort, function () {
        console.log('Example app listening on port: ' + hostPort);
    });
    /*var appEnv = cfenv.getAppEnv();
    app.listen(appEnv.port, '0.0.0.0', function () {
        console.log('Example app listening on port 3000!');
    });*/
}

db.find
    ({selector:{'date':{'$gt': '2017-02-07T15:15:54.946Z'}}, limit: 1000}, function(er, result) {
    if (er) {
        throw er;
    }
    startserver(result.docs);
});

///////////////////////////////////

/*app.get('/print', function (req, res) {
    var page = '<h1>This is PRINTING page!</h1>';
    page += '</br>';
    page += '<h2>' + mymodule2.print() +'</h2>';
    res.send(page);
});*/
/*app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/public/" + "index.html");
})
app.get("/sayHello", function (request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!");
});*/


/*var hostPort = 4444;
app.listen(hostPort, function () {
    console.log('Example app listening on port: ' + hostPort);
});*/


/*var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, '0.0.0.0', function () {
    console.log('Example app listening on port 3000!');
});*/


