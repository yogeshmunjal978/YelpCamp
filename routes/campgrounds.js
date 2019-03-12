var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareobj = require("../middleware/index");

router.get("/",function(req, res){
   Campground.find({},function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});       
       }
   });
});

router.post("/",middlewareobj.isLoggedIn,function(req, res){
    var nam = req.body.name; 
    var img = req.body.image;
    var descp =req.body.description;
    var author= {id: req.user._id, username: req.user.username}; 
    var newCampground = { name : nam, image : img, description : descp, author:author};
    Campground.create(newCampground, function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new",middlewareobj.isLoggedIn,function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

router.get("/:id/edit",middlewareobj.checkCampgroundOwner, function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/edit",{campground : foundCampground});
    });
});

router.put("/:id",middlewareobj.checkCampgroundOwner, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

router.delete("/:id",middlewareobj.checkCampgroundOwner, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;