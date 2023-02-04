const { MongoClient } = require('mongodb');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Connection URI
const uri = `mongodb://127.0.0.1:${process.env.MONGO_PORT}/`
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

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
        const list = {title: item};
        res.redirect('/');
    })
    // connect it to database
app.listen(process.env.PORT, () => console.log('toDO Serve active!'));