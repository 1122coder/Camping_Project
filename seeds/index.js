const mongoose = require('mongoose');
const Campground = require("../model/campground");

mongoose.connect('mongodb://localhost:27017/yalp-camp', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection Error!"));
db.once("open", ()=>{
  console.log("Successful connection to DB ");
});

const seedDB = async() =>{
  await Campground.deleteMany( {} );
  const c = new Campground( {title : "Hiking"} );
  c.save();
}

seedDB();
