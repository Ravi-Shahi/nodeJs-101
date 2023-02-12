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

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});
const list = new mongoose.model("lists", listSchema);

// const date = new Date();
// const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
// const today = date.toLocaleDateString('hi-IN', dateOptions);

app.get('/', (req, res) => {
  item.find({}, (err, result) => {
    if (!err) {
      if (result.length === 0) {
        item.insertMany(item4);
        res.redirect('/')
      } else {
        res.render('index', { day: 'Today', newItem: result });
      }
    }
  }
  )
});

app.get('/:customListName', (req, res) => {
  const customListName = req.params.customListName;
  list.findOne({ name: customListName }, (err, result) => {
    if (!err) {
      if (!result) {
        // create a new list
        const customList = new list({
          name: customListName,
          items: item4
        })
        customList.save();
        res.redirect('/' + customListName);
      } else {
        // display list
        res.render('index', { day: result.name, newItem: result.items });
      }
    } else {
      console.log(err);
    }
  })
})

app.post('/', (req, res) => {
  const listItem = req.body.newItem;
  const name = req.body.button;
  const newItem = new item({
    name: listItem
  });
  if (name == 'Today') {
    newItem.save();
    res.redirect('/');
  } else {
    list.findOne({ name: name }, (err, foundList) => {
      console.log(foundList);
      foundList.items.push(newItem);
      foundList.save();
      res.redirect('/' + foundList.name)

    })
  }
})

app.post('/delete', (req, res) => {
  console.log(req.body)
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName
  if (listName == "Today") {
    item.findByIdAndRemove(checkedItemId, (err, response) => {
      if (!err) {
        res.redirect('/')
      }
    })
  } else {
    list.findOneAndUpate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, (err, res) => {
      if (!err) {
        res.redirect('/' + listName)
      }
    })
  }

})


app.listen(process.env.PORT, () => console.log('App is active and ready to serve!'));