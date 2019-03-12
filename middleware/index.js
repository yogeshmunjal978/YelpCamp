var Campground = require("../models/campground");
var Comment = require("../models/comments");

var middlewareobj= {};

middlewareobj.isLoggedIn = function(req,res,next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in do that");
    res.redirect("/login");
}

middlewareobj.checkCommentOwner=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","you dont have permission")
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}
middlewareobj.checkCampgroundOwner= function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                res.redirect("back");
            }else{
                if(foundCampground.author._id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}

module.exports = middlewareobj;
