require('dotenv').config();

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    var cityName = req.body.cityName;
    // var stateCode = req.body.stateCode;
    // var contryCode = req.body.contryCode;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + process.env.WEATHER_MAP_API_KEY + "&units=metric";
    console.log(url);
    var weatherData;
    https.get(url, function(response) {
        response.on("data", function(data) {
            weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherType = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            console.log(imageURL);
            res.send(`<p>city:<b> ${cityName}</b></p><p>temperature:<b> ${temp}</b></p><p>weather type: <b>${weatherType}</b> <img src=${imageURL}></p>`);
        })
    });

});

app.listen(process.env.PORT, function() {
    console.log("server is active and running ");
});