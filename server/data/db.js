const mongoose = require("mongoose");

const URI = `mongodb+srv://bloo-chat-admin:DJNtxpe5JVSb5H22@bloo-chat.ampn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//const URI = process.env.DB_URI; //heroku URI commented out since doesnt work, using other to run locally
async function connect() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };