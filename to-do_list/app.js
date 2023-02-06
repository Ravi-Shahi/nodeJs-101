const { MongoClient } = require('mongodb');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const uri = `mongodb://127.0.0.1:${process.env.MONGO_PORT}/`
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    // Establish and verify connection
    await client.db("todo").command({ ping: 1 });
    console.log("Connected successfully to server");
    const doc = { item: "Test ITem" };
    const result = await client.db("todo").collection("list").insertOne(doc);
    console.log(
      `A document was inserted with the _id: ${result.insertedId}`,
    );
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
  const list = { title: item };
  res.redirect('/');
})
// connect it to database
app.listen(process.env.PORT, () => console.log('toDO Serve active!'));