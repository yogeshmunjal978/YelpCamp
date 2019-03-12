var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middlewareobj = require("../middleware/index");

router.get("/new",middlewareobj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/newcomm",{campground : campground});
        }
    });
});

router.post("/",middlewareobj.isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               comment.save();
               campground.comments.push(comment);
               campground.save();
               req.flash("success","successfully added comment");
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});
router.get("/:comment_id/edit",middlewareobj.checkCommentOwner, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id",middlewareobj.checkCommentOwner,function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

router.delete("/:comment_id",middlewareobj.checkCommentOwner, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success","Comment deleted");
           res.redirect("/campgrounds");
       }
    });
});


module.exports = router;