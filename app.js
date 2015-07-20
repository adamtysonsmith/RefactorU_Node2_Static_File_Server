var express = require('express');
var fs = require('fs');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Pass the file that we want to serve as an argument
var fileToServe = process.argv[2];

// Synchronous Version
// var dataContent = fs.readFileSync('./data.txt', 'utf-8');

//app.get('/', function(req, res) {
//    res.header('Content-Type', 'text/plain');
//    res.send(dataContent);
//});

// Asynchronous Version
// Anything that depends on the result of an asynchronous call must go inside the callback.
// Code that comes after the asynchronous call is executed before the callback.
fs.readFile(fileToServe, function(err, data) {
    if(err) {
        console.log('There was an error on line 21');
        return
    } else {
        app.get('/', function(req, res) {
            res.header('Content-Type', 'text/plain');
            res.send(data);
        });
    }
});

var server = app.listen(5150, function() {
	console.log('Express server listening on port ' + server.address().port);
});