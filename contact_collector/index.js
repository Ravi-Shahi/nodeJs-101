require('dotenv').config();
const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');


mailchimp.setConfig({
    apiKey: process.env.MAIL_CHIMP_API_KEY,
    server: process.env.SERVER_PREFIX
});
const data = mailchimp.ping.get();
setTimeout(() => console.log(data), 2000);




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
    const campaignDefaults = {
        from_name: "Gettin' Together",
        from_email: "gettintogether@example.com",
        subject: "JS Developers Meetup",
        language: "EN_US"
    };
    async function add() {
        const response = await mailchimp.lists.createList({
            name: "Dairy",
            contact: email,
            permission_reminder: "permission_reminder",
            email_type_option: true,
            campaign_defaults: campaignDefaults
        })
        console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}`);
    };
    add();
})




app.listen(process.env.PORT, function() {
    console.log("Server is up and running bro!");
})