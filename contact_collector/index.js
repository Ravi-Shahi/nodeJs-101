require('dotenv').config();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


mailchimp.setConfig({
    apiKey: process.env.MAIL_CHIMP_API_KEY,
    server: process.env.SERVER_PREFIX
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const firstName = req.body.fname
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        email_address: email,
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        },
        status: "subscribed"
    }
    mailchimp.lists.addListMember(process.env.LIST_ID, data)
        .then((response) => {
            console.log("Successfully Subscribed!")
            res.sendFile(__dirname + '/successful.html');
        }, (reject) => {
            console.log(reject.response.body.title + " Please try Again!")
            res.sendFile(__dirname + "/failure.html");
        });

})


app.listen(process.env.PORT, function() {
    console.log("Server is up and running bro!");
})