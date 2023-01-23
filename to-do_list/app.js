require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const date = new Date();
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = date.toLocaleDateString('hi-IN', dateOptions);

const todoList = [];

app.get('/', (req, res) => {
    console.log(todoList);
    res.render('index', { day: today, newItem: todoList });
});

app.post('/', (req, res) => {
    const item = req.body.newItem;
    todoList.push(item);
    res.redirect('/');
})

app.listen(process.env.PORT, () => console.log('Serve is started and active!'));