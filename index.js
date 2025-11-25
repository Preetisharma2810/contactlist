const http = require('http');
const express = require('express');
const path = require('path');
const port = 9001;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine' , 'ejs');
app.set('views' , path.join( __dirname , 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/list',function (req , res) {
    Contact.find()
    .then((document) => {
        console.log(document);
        return res.render('list', {
            title : "contact list",
            Contact_List : document
        });
    }).catch((error) => {
        console.error('error creating document' , error);
        return res.redirect('/list');
   });
});
app.get('/delete-contact',function(req , res){
    let id = req.query.id;
    Contact.findByIdAndDelete(req.query.id).then((document) => {
        return res.redirect('/list'); 
    }).catch((error) => {
        console.log(error);
    }); 
});

app.post('/create-contact',function(req , res){
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }).then((document) => {
        // Handle successful document creation
        console.log('Document created:', document);
        return res.redirect('/list');
    }).catch((error) => {
        // Handle errors during document creation
        console.error('Error creating document:', error);
        return res.redirect('/list');
    });
});
app.listen(port ,function(err){
    if (err){
        console.log('error in running the server ', err);
    }
    console.log('my express server is running on port : ',port);
});





