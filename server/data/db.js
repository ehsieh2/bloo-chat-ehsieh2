const mongoose = require("mongoose");

const URI = `mongodb+srv://ehsieh2:BGjyGO1OYVTtu0bW@cluster0.r1ayc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };