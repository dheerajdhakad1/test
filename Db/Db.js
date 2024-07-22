const mongoose = require("mongoose");
const ConnectDb=(uri)=>{
    mongoose.connect(uri);
    console.log("connected to db");
}
module.exports = ConnectDb;