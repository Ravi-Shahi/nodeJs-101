require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extender: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const data = [];
app.get('/', (req, res) => {
    res.render("index", { data: data });
});

app.post('/', (req, res) => {
    const obj = {
        fname: req.body.fname,
        lname: req.body.fname,
        email: req.body.email
    }
    data.push(obj);
    res.redirect('/');
})

app.listen(process.env.PORT, () => {
    console.log("Server is up and running");
});