var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var wishList = new mongoose.Schema({
    title: {type: String, default: "Cool Wish List"},
    products:[{type:ObjectId, ref:'Product'}]
});

module.exports = mongoose.model('WishList', wishList);