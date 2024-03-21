var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/swaag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var output;

// function errorCtcher(savedItem,response){
//     if(savedItem.length === 0){
//         response.send(output);
//     }else{
//         response.status(500).send({error:"could not save product"});
//     }
// }

app.post('/product', async function (request,response){
    var product =  new Product();
    product.title = request.body.title; 
    product.price = request.body.price;
    output = await product.save();
    response.send(output);
    
});

// app.post('/product', async function(request, response){
//     try{
//         var product = new Product();
//         product.title = request.body.title;
//         product.price = request.boody.price;
        
//         output = await product.save();
//         response.send(output);

//     }catch(err){

//         response.status(500).send({error:"could not save product"})

//     }
// });


app.listen(3000, function(){
    console.log("swag shop API running on port 3000....");
})