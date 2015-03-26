var milsym = require("./sm-bc.js");

var ms2525Bch2 = 0;
var ms2525C = 1;
var symStd = ms2525Bch2;
milsym.r.setDefaultSymbologyStandard(symStd);


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 

//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

var bodyParser = bodyParser.json();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world')
});

app.post('/tg', bodyParser, function(req, res) {
	var scale = 50000;
	var bbox = "-180.0,-90.0,180.0,90.0";
	var formatGeoJSON = 2;
	
	var modifiers = "";

    if (!req.body) {
        console.log("no body")
        res.sendStatus(400);
    } else {
        console.log("Body: " + req.body);
        console.log("Sid: " + req.body.SID);
        console.log("Coords: " + req.body.ControlPoints);
        console.log("Bbox: " + req.body.Bbox);
        console.log("Scale: " + req.body.Scale);
        console.log("Width: " + req.body.wp);
        console.log("Height: " + req.body.hp);
        var json = milsym.r.RenderSymbol("ID", "Name", "Description", req.body.SID, req.body.ControlPoints, "clampToGround", req.body.Scale, req.body.Bbox, modifiers, formatGeoJSON);
        //id, name, description, symbolCode, controlPoints, pixelWidth, pixelHeight, bbox, symbolModifiers, format, symStd
        //var json = milsym.r.RenderSymbol2D("ID", "Name", "Description", req.body.SID, req.body.ControlPoints, req.body.wp, req.body.hp, bbox, modifiers, formatGeoJSON, 0);
        res.send(json);
    }
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

var modifiers = "";
//AMBUSH EXAMPLE
var symbolCode = "GHGPSLA-------X";//ambush
//var symbolCode = "GHGPGAA-------X"; //assembly area
var controlPoints = "66.26700036208742,30.62755038706961 66.27555681517738,30.64727776502703 66.25654247497746,30.64632704801704";

var bbox = "66.25,30.60,66.28,30.65";
//var bbox = "-180.0,-90.0,180.0,90.0";
var scale = 50000.0;

var formatJSON = 1;
var formatKML = 0;
var pixelWidth = 800;
var pixelHeight = 600;

//change this to format JSON to see the different output.
//var format = formatJSON;
var format = formatKML;


var json = milsym.r.RenderSymbol("ID","Name","Description", symbolCode, controlPoints, "clampToGround",scale, bbox, modifiers,format);
console.log(json);