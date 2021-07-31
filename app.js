const express = require('express')
const app = express();
const port = 80 ;
const path = require('path')
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts', { useNewUrlParser: true, useUnifiedTopology: true });


const contactSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email:String

});

const Contact = mongoose.model('Contact', contactSchema);  


app.use("/static", express.static("static"));
app.set('view engine', 'pug');
app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'views'));

app.get ( '/' , ( req , res )=>{
    res.render("home.pug" )   
})
app.get ('/contact', ( req , res )=>{
    res.render("contact.pug")
})
app.get ('/home', ( req , res )=>{
    res.render("home.pug")
})
app.post ( '/contact' , ( req , res )=>{
    var mydata= new Contact(req.body);
    mydata.save().then(()=>{
        res.send("this data has been saved")
    }).catch(()=>{
        res.status(400).send("items didnt saved")
    })
});

app.listen(port, () => {
    console.log(`the app started on ${port}`);
}) 







