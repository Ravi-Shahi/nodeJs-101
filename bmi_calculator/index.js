const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

function cmTom(cm) {
    return cm / 100;
}

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function(req, res) {
    var height = cmTom(parseFloat(req.body.height));
    var weight = parseFloat(req.body.weight);
    console.log(height);
    var bmi = (weight / (height * height)).toFixed(2);
    res.send("Your Body Mass Index is " + bmi);
});

app.listen(port, function() {
    console.log("Server started at port 8080");
});