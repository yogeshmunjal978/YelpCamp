var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comments");
var passport= require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");
var User = require("./models/user");
var methodOverride = require("method-override");
var commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds");
    

mongoose.connect("mongodb://localhost/yess_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
// seedDB();
app.use(methodOverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret: "Trivedi bach jayega sab marr jayenge",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/cd c:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP);