const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Campground = require("./model/campground");

mongoose.connect('mongodb://localhost:27017/yalp-camp', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error!"));
db.once("open", ()=>{
  console.log("Successful connection to DB ");
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res)=>{
  res.render('home');
});

app.get('/makecampground', async (req, res)=>{
  const camp = new Campground({title: "Picnic", description: "A lot of fun there"});
  await camp.save();
  res.send(camp);
})

app.listen(5000, (req, res)=>{
  console.log('Serving on port 5000');
});
