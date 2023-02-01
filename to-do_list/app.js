const { MongoClient } = require('mongodb');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    // the following code examples can be pasted here...

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

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
    // connect it to database
app.listen(process.env.PORT, () => console.log('Serve is started and active!'));