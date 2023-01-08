const express = require('express');
const { copyFileSync } = require('fs');
const path = require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact = require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//console.log(__dirname);
//this is a middleware
app.use(express.urlencoded());
app.use(express.static('assests'));

var contactList = [
    {
        name: "Anirudh",
        phone: "1234567890"
    },
    {
        name: "Arpan",
        phone: "111234567"
    },
    {
        name: "Coding Ninja",
        phone: "0987654321"
    }
]

// //middleware are used to decode the data recieved from the browser: body etc are are formed by middleware
// //middleware1
// app.use(function(req,res,next){
//     req.myName="Anriudh";
//     console.log('middleware1');
//     //next is used to pass on the control to next div so we have to use next in every middleware
//     next();
// })

// //middleware2
// app.use(function(req,res,next){
//     console.log('My name is',req.myName);
//     //console.log('middleware2');
//     next();
// })
// //this is for normal express js without any template engine
// app.get('/',function(req,res){
//     //console.log(req); 
//     //console.log(__dirname) ;
//     res.send('<h1>Cool it is running</h1>');
// })


//this is when we use template engine framework
app.get('/',function(req,res){
    //console.log(req.url);
    //res.render('home');
    //console.log(req.myName);
    //console.log(__dirname);
    Contact.find({},function(err,contacts){
        //in find empty brackets represents that right now we want all kind of records, we can enter query there
        if(err){
            console.log('Error in   fetching contacts from db');
            return ;
        }
        return res.render('home',{
            title:"Contact List",
           // contact: contactList
           contact: contacts
        });
    });   
});

app.get('/practise',function(req,res){
    return res.render('practise',{
        title: "Let us play with ejs"
    })
});

app.post('/new-contact',function(req,res){
    //redirect will redirect us to new page     
    //return res.redirect('/practise')
    
    //write now the data is stored in ram not in database so as soon as we will kill the server the data will be erased, reloading of the browser won't affect the data

    //We have commented this as we are now pushing our data in schema instead of the variable 
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    //contactList.push(req.body); we can use this also as structure of the items are same

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in  creating a contact!');
            return ;
        }
        console.log('********',newContact);
        res.redirect('back'); 
    });

    // res.redirect('/'); //res.redirect('back');
    //instead of '/' we can use 'back'

    //this console is to see how data is returned from the browser to the server
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
});
//
//we can use post or patch or put instead of get. Get is a method
//in case of node we have to declare content type whereas in case of express it automatically decalre it


//to delete a contact we need to use get

//this is a param method
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
//     let phone=req.params.phone;

// });

//this is a query method when we are storing data in database
app.get('/delete-contact',function(req,res){
    //get the id from query in ul
    let id=req.query.id;
    //finding the id in database
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return ;
        }
        res.redirect('/');
    });
});

//this is a query method when we are not storing the data in database
// app.get('/delete-contact/', function(req, res){
//     console.log(req.query);
//     let phone = req.query.phone

//     let contactindex = contactList.findIndex(contact => contact.phone == phone);

//     if(contactindex != -1){
//         contactList.splice(contactindex, 1);
//     }

//     return res.redirect('back');
// });

app.listen(port,function(err){
    if(err){
        console.log('Error in running server',err);
    }
    console.log('Yup! My express server is running on port',port);    
});

//in case of node js is nothing is return then server keeps on loading but in case of express it will print cannot get/