var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user');
var status = require('../models/status');
var bcrtypt = require('bcrypt');

var isLoggedIn = (req,res,next)=>{
  if(req.session.isLoggedin){
    next();
  }else{
    res.redirect('/login');
  }
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home_page', { title: 'Express' });
 
});

// sign up
router.get('/signup', function(req, res) {
  res.render('sign_up');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
});

router.get('/ownposts',(req,res)=>{
  user.find({email:req.session.email},(err,doc)=>{
    status.find({email:req.session.email}).sort({date: -1}).exec((err, posts) =>{
      console.log(doc.length);
      console.log(posts);

      if(doc.length == 0){
        res.render('ownposts',{user:{},posts:{}});    
      }
      else{
        res.render('ownposts',{user:doc[0],posts:posts});
      }

    })
   
  });
})



router.post('/addlikes',(req,res)=>{
  console.log(req.body);
  console.log(req.session.username);
  status.findById(req.body.post_id,(err,doc)=>{

    if(err){
      console.log(err);
    }else{
      var likeArray = doc.likes;
      // console.log(likeArray);
      if(likeArray.includes(req.session.username)){
        console.log('included');
        for(var i = likeArray.length - 1; i >= 0; i--) {
          if(likeArray[i] === req.session.username) {
             likeArray.splice(i, 1);
          }
      }
      }else {
        likeArray.push(req.session.username);
      }
      setTimeout(()=>{
        status.findOneAndUpdate({_id:req.body.post_id},{ $set: { likes: likeArray }},(err,post)=>{
          console.log(likeArray);
          res.send({likes:likeArray})
        })
      },500)
    }
  })
});



router.post('/login_service', function(req, res) {
  user.find({email:req.body.email},(err,doc)=>{
    console.log(doc)
    if(doc.length == 0){
      console.log(`0`);
      res.send({passed:0});
    }else{
      console.log(`password : `,doc[0].password);
      if(bcrtypt.compareSync(req.body.password,doc[0].password)){
        req.session.isLoggedin = true;
        req.session.email = doc[0].email;
        req.session.username = doc[0].username;
        res.send({passed:1});
      }else{
        res.send({passed:0});
      }
    }
  })
 console.log(req.body)
});

router.post('/signup_service',(req,res)=>{
  console.log(req.body)
  user.find({email:req.body.email},(err,response)=>{
    console.log(response)
    if(err){res.send({success:0,info:"Something Went Wrong ,Please try again"})};
    if(response.length > 0){ res.send({success:0,info:"Email Id Exists!"}) }
   if(response.length == 0){ 
    bcrtypt.hash(req.body.password,10,(err,hash)=>{
     req.body.password = hash
    user.insertMany([req.body],(err,doc)=>{
      if(err){
        res.send({success:0,info:"Something Went Wrong ,Please try again"});
      }else{
        console.log(doc);
        res.send({success:1,info:"Successfully Signed Up!"})
      }
    });
    // console.log(hash)
    });
    
  };
  });
});

router.get('/timeline',isLoggedIn,(req,res)=>{
  console.log(req.session);
  user.find({email:req.session.email},(err,doc)=>{
    status.find({}).sort({date: -1}).exec((err, posts) =>{

      console.log(posts);

      if(doc.length == 0){
        res.render('timeline',{user:{},posts:{}});    
      }
      else{
        res.render('timeline',{user:doc[0],posts:posts});
      }

    })
   
  });
  
});

router.post('/createpost',(req,res)=>{
  console.log(req.body);
  status.insertMany([req.body],(err,doc)=>{
    if(err){
      res.send({isUploaded:false});
    }else{
      res.send({isUploaded:true});
    }
  })
});





module.exports = router;
