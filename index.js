
require('dotenv').config();

//require express
const express=require('express');
const app=express();
const env=require('./config/enviroment');
const path=require('path');
const expressLayouts=require('express-ejs-layouts');

 const port=process.env.PORT
const db=require('./config/mongoose');
// Creating session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

// requiring mongo-store, so that we can use the existing user even after server start
const MongoStore = require('connect-mongo');
const flash=require('connect-flash')

app.use(express.urlencoded());

app.use(express.static(env.asset_path));
app.set('view engine','ejs');



  

// set path of views
 app.set('views',path.join(__dirname,'views'));
 app.use(expressLayouts);
 const customMware=require('./config/middleware');
 
 // mongo store is used to store the session cookie in the db 
app.use(session({
    name: "Employee-Review-System",
    // change secret during before deployment in production 
    secret: env.session_cokkie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB_URL,
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))

// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use flash
app.use(flash());
app.use(customMware.setFlash)

//use express router
// setting up the router, following MVC structure.
app.use('/' , require('./routes/index'));

//chaecking the server is running on port or not
app.listen(port,(err)=>{
    if(err){
        console.log("port is not running try to use differnt port",err);
    }
    else{
        console.log("port is running on port",port)
    }

}
   
)
