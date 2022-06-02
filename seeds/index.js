const mongoose = require('mongoose');
const Campground = require("../model/campground");
const cities = require('./cities');
const {descriptors , places} = require('./seedsHelper');

mongoose.connect('mongodb://localhost:27017/yalp-camp', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error!"));
db.once("open", ()=>{
  console.log("Successful connection to DB ");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() =>{
  await Campground.deleteMany({});
  for (let i = 0; i < 50 ; i+=1){
    const randomSel = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location : `${cities[randomSel].city} , ${cities[randomSel].state}`,
      title : `${sample(places)} ${sample(descriptors)}`
    });
    await camp.save();
  }
}

seedDB().then (() => {
  mongoose.connection.close();
});
