var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cors = require('cors');
var db = mongoose.connect('mongodb://localhost/swaag-shop');

var Product = require('./model/product');
var WishList = require('./model/wishlist');
const wishlist = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());


// function errorCtcher(savedItem,response){
//     if(savedItem.length === 0){
//         response.send(output);
//     }else{
//         response.status(500).send({error:"could not save product"});
//     }
// }

app.post('/product', async function (request,response){
    var output;
    try{

        var product =  new Product();
        product.title = request.body.title; 
        product.price = request.body.price;
        product.url = request.body.url;
        output = await product.save();
        response.send(output);

    }catch(error){

        response.status(500).send({error:"data Could not be saved into Product DB"});

    }
    
});

app.get('/product', async (request,response)=>{
   try{

    var products = await Product.find({});
    response.send(products);

   } catch(error){
    response.status(500).send({error:"process aborted"});
   }

});

app.post('/wishlist', async (request,response)=>{
    var output;
    // var wishList = new WishList();
    //     wishList.title = request.body.title;
    //     output = await wishList.save();
    //     response.send(output);
    try{

        var wishList = new WishList();
        wishList.title = request.body.title;
        output = await wishList.save();
        response.send(output);

    }catch(error){
        response.status(500).send({error:"data could not be saved into WWishList DB"});
    }
});

app.put('/wishlist/product/add', async (request,response)=>{
    

    try{

        var product = await Product.findOne({_id: request.body.productId});

        wishList = await WishList.updateOne({_id: request.body.wishId},{$addToSet:{products: product._id}}).exec;
        response.send(wishList);

        // try{
        //     wishList = await WishList.updateOne({_id: request.body.wishId},{$addToSet:{products: product._id}});
        //     response.send(wisList);

        // }catch(error){
        //     response.status(500).send({error:"could noot add product to wWshList"});
        // }

    }catch(error){
        response.status(500).send({error:"could not find item in Product"});
    }
});

app.get('/wishlist', async (request,response)=>{
    try{

        var wishlists = await WishList.find().populate({path: 'products',model: 'Product'});
        response.send(wishlists);

    }catch(error){
        response.status(500).send({error:"process aborted"});
    }
});

app.listen(3000, function(){
    console.log("swag shop API running on port 3000....");
});