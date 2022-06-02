const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require("./model/campground");

app.use(express.urlencoded({extended : true}));

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

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res)=>{
  res.render('campground/new');
});

app.post('/campgrounds', async(req,res)=> {
  const campground  = new Campground(req.body.campground);
  campground.save();
  res.redirect(`/campgrounds/${campground.id}`);
})

app.get('/campgrounds/:id', async(req, res)=> {
  const camp = await Campground.findById(req.params.id);
  res.render('campground/show', { camp });
})


app.listen(5000, (req, res)=>{
  console.log('Serving on port 5000');
});
