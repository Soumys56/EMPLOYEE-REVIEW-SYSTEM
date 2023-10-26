// const env=require('../config/enviroment')
require('dotenv').config()
var mongoose = require('mongoose');
//Set up default mongoose connection
// var mongoDB = `mongodb://127.0.0.1/${env. db}`;
var mongoDB=process.env.MONGO_DB_URL;

// mongoose.connect(mongoDB, { useNewUrlParser: true });
//  //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open',function(){
//     console.log("Db is connected")
// })

mongoose.connect(mongoDB).then(()=>{
    
    console.log("DB connected");
    

}).catch(error => console.log(error));
