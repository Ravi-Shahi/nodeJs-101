require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    console.log(req);

    console.log(fname + lname + ':' + email);
});



app.listen(process.env.PORT, function() {
    console.log("Server is up and running bro!");
})