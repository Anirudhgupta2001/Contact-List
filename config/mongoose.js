//require the library 
const mongoose = require('mongoose');

//connect to database
// mongoose.connect('mongodb://127.0.0.1:27017/test');
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection to check if it is successfull
const db=mongoose.connection;
//this db will tell whether we have made a connection between server and database

//error
// db.on('error',console.error.bind(console,'error connecting to db'));
db.on('error', function(err) { console.log(err.message); });

//up and running then the print the message
db.once('open',function(){
    console.log('Successfully connected to the database');
})
