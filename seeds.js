var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [
    {name : "MANALI", image: "http://www.photosforclass.com/download/flickr-3753652230", description: "One of the best Campsite"},
    {name : "HIMACHAL", image: "http://www.photosforclass.com/download/flickr-9580653400", description: "I just love it"},
    {name : "SHILLONG", image: "http://www.photosforclass.com/download/flickr-7121859753", description: "Visit this campste again again"},
];
function seedDB(){

    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("campground removed");
        }
    });
    // data.forEach(function(seed){
    //     Campground.create(seed,function(err,campground){
    //         if(err){
    //             console.log("err");
    //         }else{
    //             console.log("created successfully");
    //             Comment.create(
    //                 {
    //                 text: "I have been there many times",
    //                 author: "Sartaj Singh"
    //                 },function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("added comment");
    //                 } 
    //             }
    //         )}
    //     });
    // });
}
module.exports =seedDB;



