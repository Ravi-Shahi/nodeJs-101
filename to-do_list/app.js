const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose.set('strictQuery', true);
const url = "mongodb://127.0.0.1:27017/todoDB";
mongoose.connect(url);

const itemSchema = new mongoose.Schema({
  name: String
})

const item = new mongoose.model("items", itemSchema);

const item1 = new item({
  name: "Welcome to todo list App"
});

const item2 = new item({
  name: "Hit + to add new item"
})

const item3 = new item({
  name: "Hit <-- this to delete item"
})

const item4 = [item1, item2, item3];

const date = new Date();
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = date.toLocaleDateString('hi-IN', dateOptions);

app.get('/', (req, res) => {
  item.find({}, (err, result) => {
    if (!err) {
      if (result.length === 0) {
        item.insertMany(item4);
        res.redirect('/')
      } else {
        res.render('index', { day: today, newItem: result });
      }
    }
  }
  )

});

app.post('/', (req, res) => {
  const newItem = new item({
    name: req.body.newItem
  });
  console.log(req.body);
  newItem.save();
  res.redirect('/');
})

app.post('/delete',(req,res)=>{
  item.findByIdAndRemove(req.body.checkbox, (err,response)=>{
    if(!err){
      res.redirect('/')
    }else{
      console.log(err)
    }
  })

})


app.listen(process.env.PORT, () => console.log('App is active and ready to serve!'));