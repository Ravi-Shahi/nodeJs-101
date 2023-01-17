const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/loc-wheather', function(req, res) {
    var cityName = req.body.cityName;
    var stateCode = req.body.stateCode;
    var contryCode = req.body.contryCode;


});

app.listen(port, function() {
    console.log("server is active and running at port 3000");
});