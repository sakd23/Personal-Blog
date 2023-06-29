//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");
const ejs = require("ejs");

mongoose.connect("mongodb://localhost:27017/blogPostDB");

const postSchema=new mongoose.Schema({
  postTitle:String,
  postText:String
});

const Post=mongoose.model("Post",postSchema);

const sample=new Post({
  postTitle:"test case1",
  postText:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});
// sample.save();

// let posts=[];

const homeStartingContent = "Saksham vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//home route where we render home.ejs file
//we send over the content data also
app.get("/",function(req,res){

Post.find(function(err,posts){
   if(err){
     console.log(err);
   }
   else{
     res.render("home",{homeStartingContent : homeStartingContent,posts : posts});
   }
  // console.log(typeof(temp));

});





})

//about route
app.get("/about",function(req,res){
  res.render("about",{aboutContent : aboutContent});
})


app.get("/contact",function(req,res){
  res.render("contact",{contactContent : contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.get("/posts/:postId",function(req,res){
  // console.log(req.params.postId);
let check=req.params.postId;

//user can enter in any random form upper case, having dashes, underscore
//we convert it to simple lower case no symbols using lodash
// check=_.lowerCase(check);

Post.findOne({_id:check},function(err,post){
  if(err){
    console.log(err);
  }
  else{
    if(!post){
      console.log("not successful");
    }
    else{
      res.render("post",{postText : post.postText,postTitle : post.postTitle});
    }
  }
});


});

app.post("/compose",function(req,res){
  const newPost=new Post({
    postText : req.body.PostText,
    postTitle : req.body.PostTitle
  });
  newPost.save();
  res.redirect("/");
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
